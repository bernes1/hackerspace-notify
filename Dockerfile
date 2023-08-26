FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY ./src /app/
CMD ["node", "/app/src/index.js"]
