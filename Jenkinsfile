pipeline {
    environment {
        registry = "phunguyen1211/test"
        registryCredential = 'docker-hub-credentials'
        dockerImage = ''
        max = 500
        random_num = "${Math.abs(new Random().nextInt(max+1))}"
       
    }
    agent any
    
    stages {
        // stage('reset minukube'){
        //     steps{
        //         sh "minikube delete --all"
        //         sh "minikube start"
        //     }
        // }
        // stage('Checkout Source') {
        //     steps {
        //         git 'https://github.com/nguyenphu123/next15testapp.git'
        //     }
        // }
        // stage('sonar scanning source code'){
        //     steps{
        //         sh "sonar-scanner"          
        //         sh "sudo rm -rf ./.scannerwork" 
        //         // withSonarQubeEnv( installationName: 'test') {
                             
        //         // }
                 
        //     }
        // }
        stage('Disable ufw'){
            steps{
                sh 'sudo ufw disable'
            }
        }
        stage('Build image') {
            tools {
                   jdk "JDK 17"
            }
            steps{               
                script{                   
                     dockerImage = docker.build(registry+":"+random_num)
                }
                sh "sudo /home/phu/native-sonar-scanner/sonar-scanner-6.0.0.4432-linux/bin/sonar-scanner"
                sh "sudo rm -rf .scannerwork"
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
                sh "sudo microk8s kubectl create deployment next --image="+registry+":"+random_num
                // sh "sudo microk8s kubectl set image deployment/next test="+registry+":"+random_num
                sh "sudo microk8s kubectl scale deployment next --replicas=2"
                sh "sudo microk8s kubectl expose deployment next --type=NodePort --port 3000 --target-port 3000 --name=next-service"
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
        stage("Clean up") { 
            steps { 
                 cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
            }
        }
    }
   
}