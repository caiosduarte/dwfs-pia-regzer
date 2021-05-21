FROM node

WORKDIR /usr/app

COPY package.json ./

RUN node install

COPY . .

CMD ["npm","run","dev:server"]
