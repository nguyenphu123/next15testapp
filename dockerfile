FROM node:latest
MAINTAINER phu
WORKDIR /app
COPY package*.json .
# RUN npm config set registry http://registry.npmjs.org/
# RUN npm config set https-proxy http://registry.npmjs.org/
RUN npm install npm@latest
RUN npm install
RUN npm install next
RUN npm list --depth=0
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]