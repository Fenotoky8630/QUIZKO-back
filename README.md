# 🚀 Mon Projet Laravel + React avec Docker

Ce projet utilise **Laravel** pour le backend et **React** pour le frontend. Il est entièrement dockerisé avec MySQL comme base de données.

---

## ⚙️ **Prérequis**
Avant de commencer, assure-toi d'avoir installé :
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (si tu veux exécuter le frontend sans Docker)
- [Composer](https://getcomposer.org/) (si tu veux exécuter Laravel sans Docker)

---

## 🛠️ **Installation et Configuration**

### 🌍 **1️⃣ Lancer le projet avec Docker** (Recommandé)

📌 **Étapes :**
1. **Cloner le projet :**
   ```bash
   git clone https://github.com/antonioramana/quizko-backoffice.git
   cd quizko-backoffice
2. **Créer le fichier .env (si pas déjà fait)  :**
   ```bash
   cp .env.example .env
3. **Lancer les conteneurs  :**
   ```bash
   docker-compose up -d
4. **Installer les dépendances PHP et Node.js : :**
   ```bash
   docker-compose exec php composer install
   docker-compose exec front npm install

5. **Générer la clé de l’application Laravel :**
   ```bash
   docker-compose exec php php artisan key:generate

6. **Lancer les migrations et seeders  :**
   ```bash
   docker-compose exec php php artisan migrate --seed

7. **Accéder au projet :**
  Backend (Laravel API) et Inertia react: http://localhost:8000
  Base de données (MySQL) : localhost:3306 (user: laravel_user, pass: laravel_pass)

8. **Vérifier les logs si un service ne fonctionne pas  :**
   ```bash
   docker-compose logs -f

9. **Arrêter les conteneurs  :**
   ```bash
   docker-compose down

10. **Supprimer les conteneurs et les volumes (⚠️ Supprime la base de données) :**
   ```bash
   docker-compose down -v
