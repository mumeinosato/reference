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
RUN chmod 400 app.py
RUN find . -type f -not -name 'app.py' -exec chmod 0 {} +

CMD ["flask", "run"]