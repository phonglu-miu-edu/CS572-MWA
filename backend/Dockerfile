FROM node:16.16.0-slim

WORKDIR /server

COPY ./ /server

RUN npm i

EXPOSE 81

CMD ["node", "app.js"]