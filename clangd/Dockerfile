FROM node:18.12

RUN apt-get update && \
    apt-get install -y clangd-11 build-essential && \
    apt-get clean

RUN update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-11 100

WORKDIR /work

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]