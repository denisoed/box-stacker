FROM node:20-alpine as builder

ENV NODE_ENV production

WORKDIR /src

RUN npm install -g vite

COPY package*.json ./

RUN npm install

COPY . .

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm run build

FROM node:20-alpine

COPY --from=builder /src/dist /src

WORKDIR /src

RUN npm install -g serve

CMD ["serve", "-s", "."]

EXPOSE 8080
