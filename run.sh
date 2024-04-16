cd reference
docker-compose down
cd ..

rm -rf reference
git clone https://github.com/mumeinosato/reference.git

cp .env reference/backend/.env
cp api_url.ts reference/frontend/src/assets/script/api_url.ts
cp run.rnv reference/run_script/.env

cd reference

docker-compose up --build