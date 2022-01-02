FROM node:14-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

# Client App deev
FROM base as dev-client
COPY . .

# Node server dev
FROM base as dev-server
COPY server ./server

# Client App build
FROM base as build-stage
COPY . .
RUN yarn run build

# Node server
FROM node:14-alpine as product
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --production
COPY server ./server
COPY --from=build-stage /usr/src/app/dist ./dist
CMD [ "node", "server/app.js" ]