pipeline {
    agent {
        dockerfile {
            filename 'dockerfile'
            registryUrl 'https://hub.docker.com/repository/docker/phunguyen1211/test/tags'
        }
    }
    stages {
        stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

            checkout scm
        }
        stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

            app = docker.build("phunguyen1211/test:v2")
        }
        // stage('Build') {
        //     steps {
        //         powershell 'npm install'
        //         powershell 'npm run build'
        //     }
        // }
        stage('Push image') { 
                docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                app.push("new")
                app.push("latest")
            }
        }
    }
}