# 🚀 Quick Start - Tester l'Authentification

## ⚡ Configuration Rapide (5 minutes)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

```bash
cp .env.local.example .env.local
```

Éditer `.env.local` et ajouter :

```env
# Base de données (choisir une option)
DATABASE_URL="postgresql://user:password@localhost:5432/arabic_conversation"

# NextAuth Secret (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=votre_secret_ici
```

### 3. Générer le client Prisma

```bash
npx prisma generate
```

### 4. Créer les tables

```bash
npx prisma db push
```

### 5. Lancer l'app

```bash
npm run dev
```

### 6. Tester !

Aller sur :
- **Inscription :** http://localhost:3000/auth/signup
- **Connexion :** http://localhost:3000/auth/signin
- **Dashboard :** http://localhost:3000/dashboard (protégé)

---

## 📖 Documentation Complète

- **Setup Auth :** `NEXTAUTH_SETUP.md`
- **Récap Phase 4A :** `RECAP_PHASE_4A.md`
- **Historique :** `PHASE_4A_AUTH_COMPLETE.md`

---

## 🔧 Configuration OAuth (Optionnel)

Pour activer Google/GitHub login :

### Google
1. https://console.cloud.google.com/
2. Créer un OAuth Client ID
3. Redirect URI : `http://localhost:3000/api/auth/callback/google`
4. Copier Client ID/Secret dans `.env.local`

### GitHub
1. https://github.com/settings/developers
2. New OAuth App
3. Callback URL : `http://localhost:3000/api/auth/callback/github`
4. Copier Client ID/Secret dans `.env.local`

---

## 🐛 Problèmes ?

Consulter `NEXTAUTH_SETUP.md` section "Résolution de problèmes"
