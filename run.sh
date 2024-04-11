rm -rf reference
git clone https://github.com/mumeinosato/reference.git

cp .env reference/backend/.env
cp api_url.ts reference/frontend/src/api_url.ts

cd reference

docker-compose up --build