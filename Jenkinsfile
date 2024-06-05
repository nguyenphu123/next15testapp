pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                powershell 'npm install'
                powershell 'npm run build'
            }
        }
        stage('Deploy') { 
            steps {
                checkout scm
                (echo "FROM node:latest"
                 echo "MAINTAINER phu"
                 echo "ADD . /var/www"
                 echo "WORKDIR /var/www"
                 echo "USER root"
                 echo "RUN npm install"
                //  echo "RUN apt-get -y update; apt-get install -y sudo; apt-get install -y git wget"
                //  echo "RUN echo 'Jenkins ALL=NOPASSWD: ALL' >> /etc/sudoers"
                //  echo "RUN wget http://get.docker.com/builds/Linux/x86_64/docker-latest.tgz"
                //  echo "RUN tar -xvzf docker-latest.tgz"
                //  echo "RUN mv docker/* /usr/bin/"
                 echo "EXPOSE 3000"
                 echo "CMD ['npm', 'start']") > dockerfile.txt
                powershell 'docker build . -f dockerfile.txt'
                powershell 'docker push phunguyen1211/test:v2'
            }
        }
    }
}