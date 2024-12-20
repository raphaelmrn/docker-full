# Étape 1 : Image officielle Node.js
FROM node:18

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Étape 4 : Copier les fichiers du projet
COPY . .

# Étape 5 : Exposer le port et lancer l'application
EXPOSE 3050
CMD ["node", "index.js"]
