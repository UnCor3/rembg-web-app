FROM python:3.10.6

RUN python -m pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 3001

FROM node

RUN npm install 

EXPOSE 3005