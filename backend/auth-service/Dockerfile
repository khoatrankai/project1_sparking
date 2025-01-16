FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./



RUN npm ci
EXPOSE 3002
COPY . .
CMD ["npm", "run", "start:dev"]