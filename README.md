# 🌙 Arabic Conversation Practice - تعلم العربية بالمحادثة

Application PWA d'apprentissage de l'arabe par la conversation avec l'IA, développée avec Next.js.

## 🎯 Fonctionnalités MVP (Phase 1)

- ✅ Interface de chat en temps réel avec Claude AI
- ✅ Support de l'arabe standard moderne (MSA) et du dialecte marocain (Darija)
- ✅ Avatar animé abstrait (halal-compliant)
- ✅ Corrections en temps réel pendant les conversations
- ✅ Scénarios immersifs pour débutants
- ✅ Application PWA installable
- ✅ Design responsive mobile-first

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Clé API Anthropic (Claude)

### Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd arabic-conversation-app

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Ajouter votre clé API Anthropic dans .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🛠️ Stack technique

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn/ui (à venir)
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **IA Conversation**: Claude API (Anthropic)
- **PWA**: @ducanh2912/next-pwa

## 📁 Structure du projet

```
arabic-conversation-app/
├── app/
│   ├── (authenticated)/
│   │   └── chat/[scenarioId]/   # Page de conversation
│   ├── api/
│   │   └── chat/                # API route Claude
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Page d'accueil
├── components/
│   ├── avatar/
│   │   └── GestureAvatar.tsx    # Avatar animé
│   ├── chat/
│   │   ├── ChatInterface.tsx    # Interface principale
│   │   └── MessageBubble.tsx    # Bulles de message
│   └── scenarios/               # Composants scénarios
├── lib/
│   ├── anthropic.ts             # Client Claude API
│   ├── constants.ts             # Configuration niveaux/langues
│   ├── prompts.ts               # Prompts système
│   └── scenarios.ts             # Définition des scénarios
└── public/
    └── manifest.json            # Configuration PWA
```

## 🎨 Design

### Palette de couleurs

```css
--primary-night: #1a2332      /* Bleu-noir profond */
--primary-gold: #d4af37        /* Or arabe */
--secondary-terracotta: #c46845
--secondary-olive: #556b2f
--neutral-sand: #f5f5dc        /* Blanc cassé */
--neutral-warm-gray: #8b8378
```

### Typographie

- **Arabe (affichage)**: Cairo
- **Arabe (corps)**: Tajawal
- **Latin**: Figtree

## 📚 Scénarios disponibles

### Débutant
1. **التعارف (Introduction)** - GRATUIT
   - Apprendre à se présenter
   - Durée: 5 min
   
2. **في المقهى (Au Café)** - PREMIUM
   - Commander des boissons
   - Durée: 8 min

3. **السوق (Au Marché)** - PREMIUM
   - Acheter fruits et légumes
   - Durée: 10 min

## 🔧 Commandes disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 🌐 Variables d'environnement

Créer un fichier `.env.local` avec :

```bash
ANTHROPIC_API_KEY=votre_clé_api_anthropic
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📝 TODO - Prochaines étapes

### Phase 2 (Semaine 2-3)
- [ ] Authentification Supabase (Google/Apple Sign-In)
- [ ] Base de données PostgreSQL (Supabase)
- [ ] Système de progression utilisateur
- [ ] Tracking des corrections
- [ ] Vocabulaire avec répétition espacée
- [ ] Plus de scénarios (intermédiaire)
- [ ] Intégration Stripe pour Premium

### Phase 3 (Semaine 4)
- [ ] Mode vocal (Speech-to-Text + Text-to-Speech)
- [ ] Mode hors ligne (PWA cache)
- [ ] Scénarios avancés
- [ ] Export de vocabulaire (PDF/Anki)
- [ ] Gamification (streaks, badges)

## 🤝 Contribution

Ce projet est en développement actif. Les contributions sont les bienvenues !

## 📄 Licence

Propriétaire - Tous droits réservés

## 🙏 Remerciements

- Claude AI (Anthropic) pour l'intelligence conversationnelle
- Next.js pour le framework
- La communauté open-source

---

Développé avec ❤️ pour les apprenants d'arabe

