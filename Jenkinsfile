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
               
               
                script{
                    
                     dockerImage = docker.build(registry+":v3")
                }
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
        stage('Deploying container to Kubernetes') {
            steps {
                sh "minikube start"
                // sh "kubectl apply -f deployment.yaml"
                // sh "kubectl get deployments"
                // sh "kubectl get services"
                // script {
                // kubernetesDeploy(configs: "deployment.yaml", 
                //                                 "service.yaml")
                // }
            }
        } 
    }
   
}