FROM node:18-alpine as client

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "serve:app" ]
