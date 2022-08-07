FROM node:16.16.0-slim as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html
#WORKDIR /usr/local/app

#RUN rm -rf ./*

COPY --from=build . .
RUN find .

#COPY --from=build ./dist/frontend .
#
#EXPOSE 80
#
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
