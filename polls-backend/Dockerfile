FROM node:14

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN mkdir app

WORKDIR /app

COPY package.json .

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD npx prisma db push; npm run dev