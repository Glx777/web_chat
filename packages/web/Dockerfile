FROM node:14.5.0

WORKDIR /usr/src/app/

COPY ./packages/web/package.json ./packages/web/

WORKDIR /usr/src/app/packages/web/

RUN yarn install --production

COPY . ../../packages/web/

ENV NODE_ENV production

RUN yarn build

EXPOSE 4000
EXPOSE 5000

CMD ["yarn", "start:prod"]