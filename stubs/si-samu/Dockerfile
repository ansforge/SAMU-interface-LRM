FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npx", "nodemon", "index.js"]