FROM php:8.2-fpm-alpine

# Ajout utilisateur et groupe
RUN addgroup -S eni && adduser -S -G eni eni

# Installation des extensions nécessaires
RUN apk add --no-cache libpq-dev zip libzip-dev freetype libjpeg-turbo libpng freetype-dev libjpeg-turbo-dev libpng-dev \
    && docker-php-ext-configure pgsql --with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip \
    && docker-php-ext-configure pcntl --enable-pcntl \
    && docker-php-ext-install pcntl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && apk del freetype-dev libjpeg-turbo-dev libpng-dev \
    && rm -rf /tmp/* /var/cache/apk/*

# Définition de l’utilisateur non-root
USER eni

# Définition du dossier de travail
WORKDIR /app

# Installation de Composer
COPY --from=composer /usr/bin/composer /usr/bin
COPY --chown=eni:eni composer.json composer.lock ./

# Installation des dépendances PHP
RUN composer install --no-scripts --prefer-dist --no-dev \
    && composer dump-autoload --optimize \
    && rm -rf /root/.composer/cache

# Exposition du port
EXPOSE 8000

# Copie des fichiers restants
COPY --chown=eni:eni . /app

# Commande de lancement
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
