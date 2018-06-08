@Library('jenkins-shared-libs') _

pipeline {
    agent {
        node {
            label 'math10'
        }
    }
    stages {
        stage('TestArgs') {
            agent {
                node {
                    label 'math10'
                }
            }
            steps {
                initialSetup()
                sh 'npm install'
                sh 'npm run testArgs'
            }
        }
        stage('TestOutput') {
            parallel {
                stage('TestOutput1') {
                    steps {
                        sh 'npm run testOutput1'
                    }
                }
                stage('TestOutput2') {
                    agent {
                        node {
                            label 'math11'
                        }
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm run testOutput2'
                        stash includes: 'junit/*.xml', name: 'math11Junit'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'ls -la junit'
            unstash 'math11Junit'
            sh 'ls -la junit'
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
                if (origBranch != 'master' && env.BUILD_NUMBER > 1) {
                    def commits = sh(
                            script: "git log --oneline \$(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)\$/* \\1/g'",
                            returnStdout: true
                    )
                    sh "echo \"$commits\""
                    sh "git remote add github git@github.com:lynchs61/Mathematica-Test-Runner.git"
                    sh "git fetch github"
                    sh "git checkout --track github/master"
                    sh "git checkout ${origBranch} mathematica-test-runner README.md test doc"
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