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
        stage('Disable ufw'){
            steps{
                sh 'sudo ufw disable'
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
        stage('Enable ufw'){
            steps{
                sh 'sudo ufw enable'
            }
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
                // sh "sudo microk8s kubectl delete deployment next"
                // sh "sudo microk8s kubectl delete svc next-service"
                sh "sudo microk8s kubectl create deployment next --image="+registry+":v3"
                sh "sudo microk8s kubectl scale deployment next --replicas=2"
                sh "sudo microk8s kubectl expose deployment next --type=LoadBalancer --port 8081 --target-port 8081 --name=next-service"
                sh "sudo microk8s kubectl get all --all-namespaces"
                // sh "sudo microk8s kubectl port-forward svc/next-service 80"
                sh "sudo microk8s kubectl get pods"
                // sh "sudo curl https://loca.lt/mytunnelpassword"
                // sh "sudo lt --port 8008"
               
                // script {
                //     kubernetesDeploy(configs: "deployment.yaml", 
                //                                 "service.yaml")
                // }
            }
        } 
    }
   
}