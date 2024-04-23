FROM python:3.8

RUN apt-get update &&  apt-get install -y \
    build-essential

WORKDIR /

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

CMD ["flask", "run"]