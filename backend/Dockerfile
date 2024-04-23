FROM node:18.12 as build

WORKDIR /work

COPY package*.json ./
RUN npm install

RUN npm install

FROM node:18.12 as runner

WORKDIR /work
EXPOSE 3000

RUN mkdir -p /work/temp

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY --from=build /work/dist ./dist
COPY prisma ./prisma

ENV DATABASE_URL=
ENV SCRIPT_SERVER_URL=
ENV ENDPOINT=
ENV PORT=
ENV USESSL=
ENV ACCESSKEY=
ENV SECRETKEY=


CMD ["node", "dist/main.js"]
