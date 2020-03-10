# Url shortener

## Description

It’s a simple web application which could help you shorten your URL.

Live demo: http://urlshort.tmweb.ru/

## Installation

1. Clone the repository and `cd` into it.

1. Run `composer install.`

1. Rename or copy `.env.example` file to `.env`.

1. Set your `APP_URL` in your `.env` file.

1. In the `.env` file

   - set `DB_CONNECTION`
   
   - set `DB_HOST`

   - set `DB_DATABASE`

   - set `DB_USERNAME`

   - set `DB_PASSWORD`

1. Run `php artisan migrate`.

1. Start `php -S localhost:8000 -t public`

