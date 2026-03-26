# Prisma — commandes utiles

| Situation | Commande |
|-----------|----------|
| Client TypeScript à jour après changement de `schema.prisma` | `npx prisma generate` |
| Base accessible, appliquer les migrations | `npx prisma migrate deploy` |
| Prototype local sans gérer les fichiers SQL | `npx prisma db push` |
| **Ne pas lancer** sans `DATABASE_URL` valide | `prisma migrate dev` (peut rester bloqué en attente de connexion) |
