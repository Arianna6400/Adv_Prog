FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/server.ts"]
