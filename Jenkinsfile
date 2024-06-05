pipeline {
    environment {
        registry = "phunguyen1211/test"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
    }
    agent any
    stages {
        // stage('Clone repository') {
        // /* Let's make sure we have the repository cloned to our workspace */

        //     checkout scm
        // }
        stage('Build image') {
            steps{
                script{
                     dockerImage = docker.build(registry+":v3")
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
                    docker.withRegistry('', registryCredential) {
                    dockerImage.push()
                    }
                }
            }               
        }
    }
}