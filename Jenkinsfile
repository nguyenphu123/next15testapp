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
                powershell 'npm install' 
                // powershell 'docker build . -f dockerfile.txt'
                // powershell 'docker push phunguyen1211/test:v2'
            }
        }
    }
}