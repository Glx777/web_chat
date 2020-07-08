FROM node:14.5.0

WORKDIR /usr/src/web

COPY package.json yarn.lock .env ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]