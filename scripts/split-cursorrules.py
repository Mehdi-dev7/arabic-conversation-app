#!/usr/bin/env python3
"""Split root .cursorrules into .cursor/rules/*.mdc files (one per ## section)."""
from __future__ import annotations

import re
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / ".cursorrules"
RULES_DIR = ROOT / ".cursor" / "rules"


def slugify(title: str) -> str:
    t = title.replace("##", "").strip()
    t = re.sub(r"[^\w\s-]", "", t, flags=re.UNICODE)
    t = re.sub(r"[-\s]+", "-", t).lower()
    return (t[:80] or "section").strip("-")


def frontmatter(title: str) -> str:
    t = title.lower()
    desc = title.replace("##", "").strip()[:180]
    always = False
    globs: str | None = None

    if "project overview" in t:
        always = True
    elif "repo layout" in t:
        always = True
    elif "tech stack" in t:
        always = True
    elif "database schema" in t:
        globs = "**/prisma/**/*,**/schema.prisma,**/supabase/**/*.sql"
    elif "design requirements" in t or "design principles" in t:
        globs = "**/*.{tsx,css}"
    elif "coding standards" in t:
        globs = "**/*.{ts,tsx}"
    elif "testing requirements" in t or "deployment" in t:
        globs = "**/*.{ts,tsx,json,yml,yaml}"
    elif "security" in t and "anti-abuse" in t:
        globs = "**/api/**/*,**/middleware.ts,**/auth/**/*"

    lines = ["---", f"description: {desc}"]
    if globs:
        lines.append(f"globs: {globs}")
    lines.append(f"alwaysApply: {str(always).lower()}")
    lines.append("---\n")
    return "\n".join(lines)


def main() -> None:
    text = SRC.read_text(encoding="utf-8")
    RULES_DIR.mkdir(parents=True, exist_ok=True)

    parts = re.split(r"(^## .+$)", text, flags=re.MULTILINE)
    chunks: list[tuple[str, str]] = []
    preamble = parts[0]
    if preamble.strip():
        header = (
            "---\n"
            "description: En-tête document — voir les autres règles pour le détail\n"
            "alwaysApply: false\n"
            "---\n\n"
        )
        (RULES_DIR / "000-title.mdc").write_text(header + preamble.strip() + "\n", encoding="utf-8")

    for i in range(1, len(parts), 2):
        title = parts[i].strip()
        body = parts[i + 1] if i + 1 < len(parts) else ""
        chunks.append((title, body))

    written: list[str] = ["000-title.mdc"]
    for idx, (title, body) in enumerate(chunks, start=1):
        slug = slugify(title)
        fname = f"{idx:03d}-{slug}.mdc"
        path = RULES_DIR / fname
        n = 1
        while path.exists():
            fname = f"{idx:03d}-{slug}-{n}.mdc"
            path = RULES_DIR / fname
            n += 1
        content = f"{title}\n{body}".strip() + "\n"
        path.write_text(frontmatter(title) + content, encoding="utf-8")
        written.append(path.name)

    print(f"Wrote {len(written)} files to {RULES_DIR}")


if __name__ == "__main__":
    main()
