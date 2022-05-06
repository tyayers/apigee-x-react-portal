FROM node:12

WORKDIR /usr/src/app

COPY service/package*.json ./

RUN npm install

COPY service .
RUN npm run build
#COPY client/build ./public

COPY client ./client
RUN cd client && npm cache clean --force && npm install && npm run build
RUN cp -rf client/build/. ./public/

EXPOSE 8080

CMD [ "node", "dist" ]