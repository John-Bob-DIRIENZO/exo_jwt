# Correction de l'exercice sur les JWT

Le but du jeu était de créer d'un coté un serveur d'authentification, 
capable de gérer des users.

Ce serveur va exposer un endpoint qui va recevoir des credentials
en POST via une authentification basique, les vérifier et, s'ils sont
exacts, renvoyer un JWTn valable 10 minutes avec les informations de 
l'utilisateur.

Ce JWT est signé en RS256 pour pouvoir être vérifié du côté client avec
la clé publique et signé seulement du côté serveur avec la clé privée.

La clé privée est générée par le serveur puis est stockée sur un fichier
dans la partie privée du serveur pour pouvoir être réutilisée plusieurs 
fois.

La clé publique est générée au même moment et est passée en même temps
que le JWT

L'app React est beaucoup plus simple et ne consiste qu'en quelques pages :
- une page de login
- 2 pages protégées pour les utilisateurs standards
- une page protégée pour les admins

## How to run that
Un script npm permet de lancer toute l'application
```
cd front-react && npm run project
```