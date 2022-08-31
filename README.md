#  Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете

**Кратко**

1. Информация о выполненном проекте.
2. Страница с фильмами. На ней есть форма поиска фильмов и блок с результатами поиска.
3. Страница с сохранёнными фильмами. Показывает фильмы, сохранённые пользователем.
4. Создайте свой профиль.

* Имя проекта: movies-explorer-api 

* Тип проекта: Бэкенд дипломного проекта - сервис по поиску фильмов

* Используемые технологии:

  - Express.js
  - MongoDB
  - Cors
  - Сбор логов
  - Модули
  - Деструктуризация
  - webpack

***

     "main": "app.js",
      "scripts": {
       "dev": "nodemon app.js",
        "start": "node app.js",
        "lint": "npx eslint ."
     },
     "dependencies": {
       "bcryptjs": "^2.4.3",
       "body-parser": "^1.20.0",
       "celebrate": "^15.0.1",
       "cookie-parser": "^1.4.6",
       "cors": "^2.8.5",
       "dotenv": "^16.0.1",
       "express": "^4.18.1",
       "express-winston": "^4.2.0",
       "jsonwebtoken": "^8.5.1",
       "mongoose": "^6.3.6",
       "helmet": "^5.1.1",
       "validator": "^13.7.0",
       "winston": "^3.8.1"
      },
     "devDependencies": {
       "eslint": "^8.17.0",
       "eslint-config-airbnb-base": "^15.0.0",
       "eslint-plugin-import": "^2.26.0",
       "nodemon": "^2.0.16"
     }

***

* [Pull request](https://github.com/Vik163/movies-explorer-api/pull/1)
* домен - api.vik.diplom.nomoredomains.xyz
* Фронтенд - [movies-explorer-frontend](https://github.com/Vik163/movies-explorer-frontend)
