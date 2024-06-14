FROM node:latest
MAINTAINER phu
ADD . /var/www
WORKDIR /var/www

# RUN npm config set registry http://registry.npmjs.org/
# RUN npm config set https-proxy http://registry.npmjs.org/
RUN npm i --https-proxy=http://registry.npmjs.org/ -g npm@latest
RUN npm --https-proxy=http://registry.npmjs.org/ -g install
RUN npm list --https-proxy=http://registry.npmjs.org/ -g --depth=0
EXPOSE 3000
CMD ["npm", "start"]