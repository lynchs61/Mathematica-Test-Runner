@Library('jenkins-shared-libs') _

pipeline {
    agent {
        node {
            label 'mathematica && npm-@lynch-cc'
        }
    }
    stages {
        stage('Test') {
            steps {
                initialSetup()
                sh 'npm install'
                script {
                    def status = sh script: 'npm run testArgs', returnStatus: true
                    println("npm run testArgs: exit(${status})")
                }
                script {
                    def status = sh script: 'npm run testOutput1', returnStatus: true
                    println("npm run testOutput1: exit(${status})")
                }
                script {
                    def status = sh script: 'npm run testOutput2', returnStatus: true
                    println("npm run testOutput2: exit(${status})")
                }
                script {
                    def status = sh script: 'npm run testMessageHandling', returnStatus: true
                    println("npm run testMessageHandling: exit(${status})")
                }
            }
        }
    }
    post {
        always {
            publishReports()
        }
        success {
            script {
                env.VERSION = sh (
                        script: "npm version patch -m \"$env.ISSUE_KEY %s\" | grep -Po \"v\\d+\\.\\d+\\.\\d+(?:-\\d+)?\"",
                        returnStdout: true
                ).trim().replaceAll("v", "")
            }
            finalizeSuccess('mathematicaclitool', null, env.VERSION)
            script {
                def origBranch = env.GIT_LOCAL_BRANCH
                def buildNumber = env.BUILD_NUMBER as Integer
                if (origBranch != 'master' && buildNumber > 1) {
                    def commits = sh(
                            script: "git log --oneline \$(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)\$/* \\1/g'",
                            returnStdout: true
                    )
                    sh "echo \"$commits\""
                    sh "git remote add github git@github.com:lynchs61/Mathematica-Test-Runner.git"
                    sh "git fetch github"
                    sh "git checkout --track github/master"
                    sh "git checkout ${origBranch} mathematica-test-runner README.md mathematicaTests doc"
                    sh "git commit -m \"$commits\""
                    sh "git tag ${env.VERSION}"
                    sh "git pull"
                    sh "git push"
                    sh "git push github ${env.VERSION}"
                }
            }
        }
        failure {
            finalizeFail()
        }
    }
}
