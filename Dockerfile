# Шаг 1: Используем официальный Node.js образ
FROM node:22

# Шаг 2: Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Шаг 3: Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Шаг 4: Устанавливаем все зависимости
RUN npm install

# Шаг 5: Копируем весь исходный код приложения
COPY . .

# Шаг 6: Запускаем приложение в режиме разработки

# Шаг 7: Открываем порт 3000 для доступа к приложению (по умолчанию React запускается на этом порту)
EXPOSE 3001

CMD ["npm", "start"]