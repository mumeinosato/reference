FROM node:18.12

RUN apt-get update && apt-get install -y clangd

WORKDIR /work

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm install -g typescript 
RUN tsc

EXPOSE 3030

CMD ["node", "dist/main.js"]
