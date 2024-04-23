FROM node:18.12 

WORKDIR /work

COPY package*.json ./
RUN npm install

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

RUN mkdir -p /work/temp

ENV DATABASE_URL=
ENV SCRIPT_SERVER_URL=
ENV ENDPOINT=
ENV PORT=
ENV USESSL=
ENV ACCESSKEY=
ENV SECRETKEY=

COPY prisma ./prisma
RUN npx prisma generate

CMD ["node", "dist/main.js"]
