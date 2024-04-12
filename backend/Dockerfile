FROM node:18.12 as build

WORKDIR /work

COPY package*.json ./
RUN npm install

COPY src tsconfig.json ./

RUN npm run build

FROM node:18.12 as runner

WORKDIR /work
EXPOSE 3000

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY --from=build /work/dist ./dist

COPY prisma ./prisma

ENV DATABASE_URL=

RUN npx prisma generate

CMD ["node", "dist/index.js"]