FROM node:18.12

WORKDIR ../
COPY ./src /opt/app

EXPOSE 3000

WORKDIR /opt/app
RUN npm install
CMD ["node", "/opt/app/index.js"]
