pipeline {
    agent {
        dockerfile true
    }
    stages {
        stage('Test') {
            steps {
                powershell 'node --version'
                powershell 'svn --version'
            }
        }
    }
}