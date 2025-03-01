FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE ${COMMAND_SERVICE_PORT}

CMD npm start