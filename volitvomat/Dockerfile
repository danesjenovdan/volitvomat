# start with the nodejs image, calling it 'build'
FROM node:26-alpine AS build

# install node modules
COPY package.json package-lock.json /
RUN npm ci

# build assets
COPY . .
EXPOSE 3000

RUN npm run build

# change base image
FROM nginx:alpine

# enable HTML5 history mode
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy built files from the 'build' container into the nginx container
COPY --from=build dist /usr/share/nginx/html
