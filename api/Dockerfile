FROM node:14.5.0

WORKDIR /usr/src/api

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]
