FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8081

CMD ["npx", "node", "index.js"]

