FROM node:18.12

RUN apt-get update && apt-get install -y clangd

WORKDIR /work

COPY package*.json ./
RUN npm install

COPY main.ts .
RUN npm install -g typescript 
RUN tsc main.ts 

EXPOSE 3030

CMD ["node", "main.js"]
