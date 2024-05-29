FROM node:18.12 

WORKDIR /work

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

RUN mkdir -p /work/temp

COPY prisma ./prisma
RUN npx prisma generate

CMD ["node", "dist/main.js"]
