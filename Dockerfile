FROM node:20-alpine

ENV APP_ROOT /src
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY ./package.json ${APP_ROOT}
COPY ./package-lock.json ${APP_ROOT}

RUN npm install
RUN npm install -g serve
RUN npm install -g vite

COPY . ${APP_ROOT}

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm run build

CMD [ "npm", "run", "serve" ]