pipeline {
    environment {
        registry = "phunguyen1211/test"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
    }
    agent any
    stages {
        
        stage('Build image') {
            steps{
                sh 'sudo docker build . -t ' + registry
                // script{
                //     jenkins ALL = (admin) NOPASSWD: /usr/bin/execute, /home/admin/calculate, /opt/synergize
                //      dockerImage = docker.build(registry+":v3")
                // }
            }
        /* This builds the actual image; synonymous to
         * docker build on the command line */

           
        }
       
        
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