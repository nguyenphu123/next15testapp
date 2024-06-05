pipeline {
    agent any
    stages {
        // stage('Clone repository') {
        // /* Let's make sure we have the repository cloned to our workspace */

        //     checkout scm
        // }
        stage('Build image') {
            steps{
                script{
                     app = docker.build("db","-f dockerfile.txt")
                }
            }
        /* This builds the actual image; synonymous to
         * docker build on the command line */

           
        }
        // stage('Build') {
        //     steps {
        //         powershell 'npm install'
        //         powershell 'npm run build'
        //     }
        // }
        stage('Push image') { 
             steps{
                script{
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                    app.push("new")
                    app.push("latest")
                    }
                }
            }               
        }
    }
}