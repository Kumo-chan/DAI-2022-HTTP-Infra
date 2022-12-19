FROM node:18.12

WORKDIR ../
COPY ./src /opt/app

EXPOSE 3000

WORKDIR /opt/app
RUN npm install
RUN apt-get update && \
  apt-get install -y vim
CMD ["node", "/opt/app/index.js"]
