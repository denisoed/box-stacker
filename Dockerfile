FROM node:lts-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Fix permissions for packages
# RUN npm config set unsafe-perm true

RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . ./

RUN chown -R node:node /app/node_modules

ARG api_url
ENV VUE_APP_API_URL=${api_url}

RUN npm run build

# start app
CMD ["npm", "run", "serve"]