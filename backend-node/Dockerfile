FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD [ "npm", "run", "dev" ]