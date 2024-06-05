pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                powershell 'npm install'
                powershell 'npm run build'
            }
        }
        stage('Test') { 
            steps {
                powershell 'npm install' 
                
            }
        }
        stage('Deploy') { 
            steps {
                checkout scm
                echo  "FROM node:latest
                MAINTAINER phu
                ADD . /var/www
                WORKDIR /var/www
                USER root
                RUN npm install
                RUN apt-get -y update; apt-get install -y sudo; apt-get install -y git wget
                RUN echo 'Jenkins ALL=NOPASSWD: ALL' >> /etc/sudoers
                RUN wget http://get.docker.com/builds/Linux/x86_64/docker-latest.tgz
                RUN tar -xvzf docker-latest.tgz
                RUN mv docker/* /usr/bin/
                RUN apt-get update && apt-get install -y locales locales-all maven nodejs \
                    && sed -i '/^#.* zh_CN.UTF-8 /s/^#//' /etc/locale.gen \
                    && locale-gen \
                    && rm -rf /var/lib/apt/lists/* \
                ENV LANG zh_CN.UTF-8
                ENV LANGUAGE zh_CN.UTF-8
                ENV LC_ALL zh_CN.UTF-8
                ENV TZ Asia/Shanghai
                EXPOSE 3000
                CMD ['npm', 'start']" > dockerfile.txt
                powershell 'docker build . -f dockerfile.txt'
                powershell 'docker push phunguyen1211/test:v2'
            }
        }
    }
}