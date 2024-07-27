FROM node:20-alpine

ENV APP_ROOT /src
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY ./package.json ${APP_ROOT}
COPY ./package-lock.json ${APP_ROOT}

RUN npm install

COPY . ${APP_ROOT}

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm i -g serve
RUN npm run build

CMD [ "npm", "run", "serve" ]