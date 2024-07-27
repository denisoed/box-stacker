FROM node:20-alpine

ENV APP_ROOT .
ENV NODE_ENV production

WORKDIR ${APP_ROOT}

COPY ./package.json ${APP_ROOT}
COPY ./package-lock.json ${APP_ROOT}

RUN npm install serve -g
RUN npm install vite -g

RUN npm install

COPY . .

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm run build

CMD [ "npm", "run", "serve" ]