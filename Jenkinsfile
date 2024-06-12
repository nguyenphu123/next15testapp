pipeline {
    environment {
        registry = "phunguyen1211/test"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
    }
    agent any
    
    stages {
        // stage('reset minukube'){
        //     steps{
        //         sh "minikube delete --all"
        //         sh "minikube start"
        //     }
        // }
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
       
        stage('Check node, pod'){
            steps{
                sh "sudo microk8s kubectl get all --all-namespaces"
            }
        }
        stage('Deploying container to Kubernetes') {
            steps {
                sh "sudo microk8s kubectl create deployment next --image="+registry+":v3"
                sh "sudo microk8s kubectl scale deployment next --replicas=2"
                sh "sudo microk8s kubectl expose deployment next --type=NodePort --port=80 --name=next-service"
                sh "sudo microk8s kubectl get all --all-namespaces"
                // script {
                //     kubernetesDeploy(configs: "deployment.yaml", 
                //                                 "service.yaml")
                // }
            }
        } 
    }
   
}