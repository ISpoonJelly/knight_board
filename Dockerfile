FROM node:6.12.2

WORKDIR /usr/board
COPY . .

RUN npm install