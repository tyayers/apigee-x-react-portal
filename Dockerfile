FROM node:14

WORKDIR /usr/src/app

COPY service/package*.json ./

RUN npm install

COPY service .
RUN npm run build
#COPY client/build ./public

COPY client ./client
RUN cd client && npm install && npm run build && cd ..
RUN cp -rf client/build/. ./public/

EXPOSE 8080

CMD [ "node", "dist" ]