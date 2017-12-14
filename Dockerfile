FROM node:6.12.2

COPY . /usr/board

WORKDIR /usr/board

RUN npm install