FROM php:8.2-apache

# Enable Apache mod_rewrite if needed
RUN a2enmod rewrite
# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    zip \
    libzip-dev \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy source code
COPY . .

# Install PHP extensions if needed (pdo, pdo_mysql, etc.)
RUN docker-php-ext-install pdo pdo_mysql

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions (adjust as needed)
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80