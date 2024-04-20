FROM python:3.8

RUN apt-get update &&  apt-get install -y \
    build-essential

WORKDIR /usr/src/app
ENV FLASK_APP=app

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt