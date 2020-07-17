FROM node:14.5.0

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./
COPY packages/api/package.json ./packages/api/

RUN yarn install --production

COPY . .

WORKDIR /usr/src/app/packages/api/

ENV NODE_ENV production

RUN yarn build

EXPOSE 4000
EXPOSE 5000

CMD ["yarn", "start:prod"]