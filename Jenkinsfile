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
        post {          
            success {  
                mail bcc: '', body: "<b>Example</b><br>Project: Gacha <br>Build Number: v3", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Success build project gacha v3", to: "phu.nguyen@lp.com.vn";
            }  
            failure {  
                mail bcc: '', body: "<b>Example</b><br>Project: Gacha <br>Build Number: v3 failed", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Failed to build project gacha v3", to: "phu.nguyen@lp.com.vn";
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
        post {          
            success {  
                mail bcc: '', body: "<b>Example</b><br>Project: Gacha <br>Build Number: v3", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Success push project gacha v3", to: "phu.nguyen@lp.com.vn";
            }  
            failure {  
                mail bcc: '', body: "<b>Example</b><br>Project: Gacha <br>Build Number: v3 Push failed", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "Failed to Push project gacha v3", to: "phu.nguyen@lp.com.vn";
            }           
        }  
    }
}