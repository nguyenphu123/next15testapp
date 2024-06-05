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
                powershell './jenkins/scripts/test.sh' 
            }
        }
        stage('Deliver') { 
            steps {
                powershell './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                powershell 'docker push phunguyen1211/test:v2'
                powershell './jenkins/scripts/kill.sh'
                
            }
        }
    }
}