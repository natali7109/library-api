## 🚀 Технологии

- **Node.js** — среда выполнения
- **Express.js** — веб-фреймворк
- **MongoDB** — база данных
- **Mongoose** — ODM для MongoDB
- **dotenv** — переменные окружения
- **CORS** — кросс-доменные запросы
- **Nodemon** — автоперезагрузка при разработке

---
## 📁 Структура проекта
library-api/
├── src/
│ ├── models/
│ │ ├── Book.js
│ │ └── User.js
│ ├── controllers/
│ │ ├── bookController.js
│ │ └── userController.js
│ ├── routes/
│ │ ├── books.js
│ │ └── users.js
│ ├── middleware/
│ │ └── errorHandler.js
│ ├── app.js
│ └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

text

---
## 🔧 Установка и запуск

# 1. Клонируй репозиторий
```bash
git clone https://github.com/natali7109/library-api.git
cd library-api
# 2. Установи зависимости
bash
npm install
# 3. Настрой переменные окружения
Создай файл .env и добавь:
env
PORT=3005
MONGODB_URI=mongodb://127.0.0.1:27017/library
# 4. Запусти MongoDB
bash
mongod
# 5. Запусти сервер
bash
npm run dev
Сервер будет доступен по адресу:
http://127.0.0.1:3005

📌 Доступные маршруты

📚 Книги (/api/books)
Метод	Маршрут	Описание
GET	/api/books	Получить все книги
GET	/api/books/:id	Получить книгу по ID
POST	/api/books	Создать книгу
PUT	/api/books/:id	Обновить книгу
DELETE	/api/books/:id	Удалить книгу
POST	/api/books/:id/borrow	Взять книгу
POST	/api/books/:id/return	Вернуть книгу

👤 Читатели (/api/users)
Метод	Маршрут	     Описание
GET	/api/users	     Получить всех читателей
GET	/api/users/:id	Получить читателя по ID
POST	/api/users	Создать читателя
PUT	/api/users/:id	Обновить читателя
DELETE	/api/users/:id	Удалить читателя
GET	/api/users/:id/books	Получить книги читателя

🧪 Примеры запросов
Создать книгу
bash
curl -X POST http://127.0.0.1:3005/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","year":1949}'
Получить все книги
bash
curl http://127.0.0.1:3005/api/books
Создать читателя
bash
curl -X POST http://127.0.0.1:3005/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","lastname":"Smith","username":"alice_s"}'

🐛 Обработка ошибок
Код	Описание
200	Успешный запрос
201	Успешное создание
400	Ошибка валидации
404	Сущность не найдена
500	Внутренняя ошибка сервера

📦 Скрипты
Команда	     Описание
npm run dev	Запуск в режиме разработки (с nodemon)
npm start	Запуск в обычном режиме
📝 Автор
Natali7109
GitHub: natali7109

📄 Лицензия
Проект выполнен в рамках домашнего задания.