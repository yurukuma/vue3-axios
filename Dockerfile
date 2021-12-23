

# Client App
FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN npm run build

# Node server
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY server ./server
COPY --from=build-stage /usr/src/app/dist ./dist
CMD [ "node", "server/app.js" ]