FROM node:20.9.0 as builder

ENV NODE_ENV production

WORKDIR /src

# vite will be installed in npm global directory
RUN npm install -g vite
COPY package*.json ./

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN  npm run build

FROM node:20.9.0

# copy built files from builder image to new clean node image without vite
COPY --from=builder /src /src
WORKDIR /src

CMD [ "npm", "run", "serve" ]

EXPOSE 8080
