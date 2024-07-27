FROM node:20-alpine

ENV APP_ROOT /src
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY ./package.json ${APP_ROOT}
COPY ./yarn.lock ${APP_ROOT}

RUN yarn install --frozen-lockfile --production

COPY . ${APP_ROOT}

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN yarn global add serve
RUN yarn build

CMD [ "yarn", "serve" ]