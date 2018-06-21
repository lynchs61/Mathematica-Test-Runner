@Library('jenkins-shared-libs') _

pipeline {
    agent {
        node {
            label 'math11'
        }
    }
    stages {
        stage('TestArgs') {
            steps {
                initialSetup()
                sh 'npm install'
                sh 'npm run testArgs'
            }
        }
        stage('TestOutputAndMessages') {
            parallel {
                stage('TestOutput1') {
                    agent {
                        node {
                            label 'math11'
                        }
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm run testOutput1'
                        stash includes: 'junit/*', name: 'testOutput1'
                    }
                }
                stage('TestOutput2') {
                    agent {
                        node {
                            label 'math12'
                        }
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm run testOutput2'
                        stash includes: 'junit/*', name: 'testOutput2'
                    }
                }
                stage('TestMessageHandling') {
                    agent {
                        node {
                            label 'math13'
                        }
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm run testMessageHandling'
                        stash includes: 'junit/*', name: 'testMessageHandling'
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    unstash 'testOutput1'   
                } catch (error) {
                    echo "No stash found for testOutput1"
                }
                try {
                    unstash 'testOutput2'   
                } catch (error) {
                    echo "No stash found for testOutput2"
                }
                try {
                    unstash 'testMessageHandling'   
                } catch (error) {
                    echo "No stash found for testMessageHandling"
                }
            }
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
