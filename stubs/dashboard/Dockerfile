FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npm run generate


EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npx", "nuxt", "start"]