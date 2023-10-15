FROM node:18.17-alpine3.17

# RUN apk add g++ make vips-dev=8.10.5-r0 --no-cache

RUN apk add --no-cache tzdata

ENV NODE_ENV=awsdev

ARG CODE_VERSION

WORKDIR /usr/app

COPY package*.json ./

ENV CODE_VERSION=$CODE_VERSION

RUN npm install

COPY . .

RUN npm run build

COPY ./ap-southeast-1-bundle.pem ./dist

CMD ["npm", "run", "start"]
