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
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t ci-cd-node-app .'
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
