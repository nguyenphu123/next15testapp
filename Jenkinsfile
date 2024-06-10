pipeline {
    environment {
        registry = "phunguyen1211/test"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
    }
    agent any
    
    stages {
        stage('Checkout Source') {
            steps {
                git 'https://github.com/nguyenphu123/next15testapp.git'
            }
        }    
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
                sh "minikube delete --all"
                sh "minikube start"
                sh "kubectl apply -f deployment.yaml"
                sh "kubectl apply -f service.yaml"
                sh "kubectl get deployments"
                sh "kubectl get services"
                // script {
                //     kubernetesDeploy(configs: "deployment.yaml", 
                //                                 "service.yaml")
                // }
            }
        } 
    }
   
}