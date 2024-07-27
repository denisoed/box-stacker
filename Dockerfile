FROM node:20.9.0

ENV APP_ROOT /src
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

ENV PATH ${APP_ROOT}/node_modules/.bin:$PATH

COPY ./package.json ${APP_ROOT}
COPY ./package-lock.json ${APP_ROOT}

RUN npm install
RUN npm install serve -g

COPY . ${APP_ROOT}

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm run build

CMD [ "npm", "run", "serve" ]