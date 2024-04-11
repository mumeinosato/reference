FROM node:18.12 as build

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm audit fix

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]