pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME = "ci-cd-node-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Atharva-04/ci-cd-nodejs-jenkins.git'
            }
        }

        stage('Install Dependencies & Run Tests') {
            steps {
                // Install dependencies only if not already installed (faster builds)
                bat 'IF NOT EXIST node_modules (npm ci --prefer-offline --no-audit) ELSE (echo Dependencies already installed)'
                bat 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Push to Docker Hub') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat """
                    docker login -u %USER% -p %PASS%
                    docker tag %IMAGE_NAME% atharva04/%IMAGE_NAME%:latest
                    docker push atharva04/%IMAGE_NAME%:latest
                    """
                }
            }
        }

        stage('Deploy to Environment') {
            steps {
                echo "📦 Deploying to AWS EC2 using SSH (placeholder for real deployment)..."
            }
        }

        stage('Slack Test (First-Time Check Only)') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_URL')]) {
                    bat """
                    curl -X POST -H "Content-type: application/json" --data "{\\"text\\": \\"🔧 Pipeline reached Slack test stage — connection OK!\\"}" "%SLACK_URL%"
                    """
                }
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_URL')]) {
                bat """
                curl -X POST -H "Content-type: application/json" --data "{\\"text\\": \\"✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} — CI/CD Pipeline Completed.\\"}" "%SLACK_URL%"
                """
            }
        }
        failure {
            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_URL')]) {
                bat """
                curl -X POST -H "Content-type: application/json" --data "{\\"text\\": \\"❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} — Check Jenkins Logs.\\"}" "%SLACK_URL%"
                """
            }
        }
    }
}
