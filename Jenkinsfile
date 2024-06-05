pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm install' 
                sh 'npm run dev'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'npm install' 
                sh 'docker build . -f dockerfile.txt'
                sh 'docker push phunguyen1211/test:v2'
            }
        }
    }
}