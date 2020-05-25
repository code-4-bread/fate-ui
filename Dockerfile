FROM node:12.16.3-alpine

RUN mkdir src

WORKDIR /src

COPY . /src

RUN npm install

CMD npm start