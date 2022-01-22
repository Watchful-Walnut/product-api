FROM node:14

LABEL maintainer="bjt888"

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]