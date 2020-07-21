FROM node:14.5.0

WORKDIR /usr/src/

COPY package.json yarn.lock /usr/src/
COPY packages/api/package.json packages/api/.env /usr/src/packages/api/

RUN yarn

COPY ./packages/api/ ./packages/api/

WORKDIR /usr/src/packages/api/

RUN yarn build

ENV NODE_ENV production

EXPOSE 4000
EXPOSE 5000

CMD ["yarn", "start:prod"]