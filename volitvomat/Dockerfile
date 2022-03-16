# start with the nodejs image, calling it 'build'
FROM node:16-alpine as build
RUN apk add --update --no-cache python3 make g++

# install node modules
# COPY package.json yarn.lock /
COPY package.json /
RUN yarn

# build assets
COPY . .
EXPOSE 3000

RUN yarn build

# change base image
FROM nginx:alpine

# enable HTML5 history mode
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy built files from the 'build' container into the nginx container
COPY --from=build dist /usr/share/nginx/html
