@Library('jenkins-shared-libs') _

pipeline {
    agent {
        node {
            label 'npm-@lynch-cc && github'
        }
    }
    stages {
        stage('Initial') {
            steps {
                initialSetup()
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
//        always {
//            publishReports()
//        }
        success {
            script {
                env.VERSION = sh (
                        script: "npm version patch -m \"$env.ISSUE_KEY %s\" | grep -Po \"v\\d+\\.\\d+\\.\\d+(?:-\\d+)?\"",
                        returnStdout: true
                ).trim().replaceAll("v", "")
            }
            finalizeSuccess('mathematicaclitool', null, env.VERSION)
            script {
                def commits = sh (
                        script: "git log --oneline \$(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)\$/* \\1/g'",
                        returnStdout: true
                ).trim()
                sh "echo \"$commits\""
                sh "git remote add github git@github.com:lynchs61/Mathematica-Test-Runner.git"
                sh "git checkout --track github/master"
                sh "git checkout ${env.GIT_LOCAL_BRANCH} mathematica-test-runner README.md test doc"
                sh "git commit -m \"$commits\""
                sh "git tag ${env.VERSION}"
                sh "git pull"
                sh "git push"
                sh "git push github ${env.VERSION}"
            }
        }
        failure {
            finalizeFail()
        }
    }
}