FROM node:20-alpine
USER node
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY src /app/
CMD ["node", "index.js"]
