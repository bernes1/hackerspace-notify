FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . /app/
CMD ["node", "index.js"]
