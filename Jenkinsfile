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
                // checkout scm
               
                powershell 'docker build . -f dockerfile.txt'
                powershell 'docker push phunguyen1211/test:v2'
            }
        }
    }
}