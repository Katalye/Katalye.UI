FROM node:lts AS build

COPY package.json \
     yarn.lock \
     /src/

RUN set -xe \
    && cd /src \
    && yarn install

COPY ./* /src/
COPY ./src/ /src/src/

RUN set -xe \
    && cd /src \
    && yarn build

FROM nginx:alpine AS publish

LABEL maintainer="Katalye (github.com/Katalye)"

COPY ./docker/rootfs/ /
COPY --from=build /src/dist/ /usr/share/nginx/html
