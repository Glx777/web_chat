FROM node:14.5.0

WORKDIR /usr/src/app/

COPY packages/web/package.json ./packages/web/.env ./packages/web/

RUN yarn install --production

WORKDIR /usr/src/app/packages/web

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start"]