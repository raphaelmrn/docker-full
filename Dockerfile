# Utilise l'image officielle Node.js avec Alpine pour démarrer 
FROM node:lts-alpine 
# Crée un dossier pour l'application 
RUN mkdir /app 
# Définit le dossier de travail 
WORKDIR /app 
# Copie le fichier index.js dans le conteneur 
COPY index.js index.js 
# Définit la commande pour exécuter l'application 
CMD ["node", "index.js"]
