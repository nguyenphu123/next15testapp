FROM node:latest
MAINTAINER phu
ADD . /var/www
WORKDIR /var/www

RUN npm install
RUN npm list -g --depth=0
EXPOSE 3000
CMD ["npm", "start"]