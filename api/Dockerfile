FROM node:14.5.0

WORKDIR /usr/src/api

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV=production

EXPOSE 5000
EXPOSE 4000

CMD ["yarn", "start:prod"]
