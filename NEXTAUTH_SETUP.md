# 🔐 Configuration de l'Authentification NextAuth

## ✅ Ce qui a été implémenté

### Providers d'authentification
1. ✅ **Email/Password** (Credentials)
2. ✅ **Google OAuth**
3. ✅ **GitHub OAuth**

### Base de données
- ✅ Prisma ORM avec PostgreSQL
- ✅ Schéma complet NextAuth (User, Account, Session, etc.)
- ✅ Tables étendues pour l'application (Conversations, Vocabulary, Progress, etc.)

### Pages
- ✅ `/auth/signin` - Connexion
- ✅ `/auth/signup` - Inscription
- ✅ `/auth/error` - Gestion erreurs

### Protection
- ✅ Middleware pour protéger les routes `/dashboard`, `/chat`, `/profile`, `/settings`

---

## 🚀 Configuration requise

### 1. Base de données PostgreSQL

**Option A : PostgreSQL Local**
```bash
# Installer PostgreSQL
brew install postgresql@14  # macOS
sudo apt install postgresql  # Linux

# Créer la base de données
createdb arabic_conversation
```

**Option B : Vercel Postgres (RECOMMANDÉ)**
```bash
# Créer un projet Vercel Postgres
# https://vercel.com/docs/storage/vercel-postgres/quickstart

# Copier DATABASE_URL depuis le dashboard Vercel
```

**Option C : Supabase**
```bash
# Créer un projet Supabase
# https://supabase.com/dashboard

# Copier DATABASE_URL depuis Settings > Database
# Format: postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres
```

### 2. Variables d'environnement

Créer/modifier `.env.local` :

```bash
# Database (choisir une des options)
DATABASE_URL="postgresql://user:password@localhost:5432/arabic_conversation?schema=public"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Générer NEXTAUTH_SECRET :
openssl rand -base64 32

# Google OAuth (optionnel mais recommandé)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth (optionnel)
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

### 3. Configuration Google OAuth

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet (ou sélectionner existant)
3. Activer **Google+ API**
4. Aller dans **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
5. Type d'application : **Web application**
6. Authorized redirect URIs :
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
7. Copier **Client ID** et **Client Secret** dans `.env.local`

### 4. Configuration GitHub OAuth

1. Aller sur [GitHub Developer Settings](https://github.com/settings/developers)
2. **New OAuth App**
3. Remplir :
   - Application name : `Arabic Conversation App`
   - Homepage URL : `http://localhost:3000`
   - Authorization callback URL : `http://localhost:3000/api/auth/callback/github`
4. **Register application**
5. Copier **Client ID**
6. **Generate a new client secret**
7. Copier dans `.env.local`

---

## 🛠️ Installation & Migration

### 1. Installer les dépendances (déjà fait)

```bash
npm install next-auth@beta prisma @prisma/client bcrypt @types/bcrypt @auth/prisma-adapter
```

### 2. Générer le client Prisma

```bash
npx prisma generate
```

### 3. Créer les tables (migration)

```bash
npx prisma db push
```

Ou pour une migration propre :

```bash
npx prisma migrate dev --name init
```

### 4. (Optionnel) Visualiser la base de données

```bash
npx prisma studio
```

Ouvrira un interface web pour explorer la BDD.

---

## 📝 Utilisation dans l'application

### Protéger une page

```tsx
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <h1>Bienvenue {session.user.name}</h1>
    </div>
  );
}
```

### Utiliser dans un composant client

```tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { SignOutButton } from '@/components/auth/SignOutButton';

export function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <h2>Bonjour {user?.name || user?.email}</h2>
      <SignOutButton />
    </div>
  );
}
```

### Récupérer l'utilisateur complet depuis la BDD

```tsx
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: true,
      conversations: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Plan : {user?.plan}</p>
      <p>Niveau : {user?.currentLevel}</p>
      <p>Streak : {user?.streakDays} jours</p>
    </div>
  );
}
```

---

## 🧪 Tests à effectuer

### Test 1 : Inscription Email/Password

1. Aller sur `http://localhost:3000/auth/signup`
2. Remplir le formulaire
3. Vérifier :
   - ✅ Compte créé dans la BDD
   - ✅ Redirection vers `/dashboard`
   - ✅ Session active

### Test 2 : Connexion Email/Password

1. Aller sur `http://localhost:3000/auth/signin`
2. Se connecter avec email/password
3. Vérifier redirection

### Test 3 : Google OAuth

1. Cliquer sur "Continuer avec Google"
2. Autoriser l'application
3. Vérifier :
   - ✅ Compte créé dans `users` table
   - ✅ Lien OAuth dans `accounts` table
   - ✅ Redirection vers `/dashboard`

### Test 4 : GitHub OAuth

1. Cliquer sur "Continuer avec GitHub"
2. Autoriser l'application
3. Vérifier même chose que Google

### Test 5 : Protection des routes

1. Déconnecté, essayer d'accéder `/dashboard`
2. Vérifier redirection vers `/auth/signin`

### Test 6 : Déconnexion

1. Utiliser `<SignOutButton />`
2. Vérifier redirection vers `/`
3. Vérifier session supprimée

---

## 🐛 Résolution de problèmes

### Erreur : `PrismaClientInitializationError`

```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers la BDD
npx prisma db push
```

### Erreur : `Invalid `prisma.user.create()` invocation`

Vérifier que `DATABASE_URL` est correcte dans `.env.local`

### Erreur : `[next-auth][error][OAUTH_CALLBACK_ERROR]`

Vérifier :
1. Les redirect URIs dans Google/GitHub console
2. Les clés `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans `.env.local`

### Erreur : `[next-auth][error][NO_SECRET]`

```bash
# Générer un secret
openssl rand -base64 32

# Ajouter dans .env.local
NEXTAUTH_SECRET=le_secret_généré
```

---

## 🎯 Prochaines étapes

### Phase 4B : Intégration avec l'app

1. [ ] Mettre à jour le dashboard pour afficher les infos user
2. [ ] Récupérer l'utilisateur dans les conversations
3. [ ] Sauvegarder les conversations dans la BDD
4. [ ] Tracker la progression
5. [ ] Implémenter rate limiting (free plan)

### Phase 5 : Stripe

1. [ ] Ajouter `stripeCustomerId` aux utilisateurs
2. [ ] Créer webhook Stripe
3. [ ] Gérer les abonnements
4. [ ] Paywall UI

---

## 📚 Ressources

- [NextAuth Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

---

**Créé le :** $(date +"%Y-%m-%d")
**Dernière mise à jour :** $(date +"%Y-%m-%d")
