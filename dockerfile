FROM node:latest
MAINTAINER phu
ADD . /var/www
WORKDIR /var/www

# RUN npm config set registry http://registry.npmjs.org/
# RUN npm config set https-proxy http://registry.npmjs.org/
RUN npm i  -g npm@latest
RUN npm  -g install
RUN npm list  -g --depth=0
EXPOSE 3000
CMD ["npm", "start"]