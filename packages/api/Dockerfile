FROM node:14.5.0

WORKDIR /usr/src/app/

COPY ./packages/api/package.json ./packages/api/

WORKDIR /usr/src/app/packages/api/

RUN yarn install --production

COPY . ../../packages/api/

RUN yarn build

ENV NODE_ENV production

EXPOSE 4000
EXPOSE 5000

CMD ["yarn", "start:prod"]