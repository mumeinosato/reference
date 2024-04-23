FROM node:18.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV DATABASE_URL=
ENV SCRIPT_SERVER_URL=
ENV ENDPOINT=
ENV PORT=
ENV USESSL=
ENV ACCESSKEY=
ENV SECRETKEY=

RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
