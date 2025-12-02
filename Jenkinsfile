pipeline {
    agent any
    
    stages {
        
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Atharva-04/ci-cd-nodejs-jenkins.git'
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t ci-cd-node-app .'
            }
        }

    }

    post {
        success {
            echo "Build Successful! 🚀"
        }
        failure {
            echo "Build Failed ❌"
        }
    }
}
