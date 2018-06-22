@Library('jenkins-shared-libs') _

pipeline {
    agent {
        node {
            label 'math10'
        }
    }
    stages {
        stage('TestArgs') {
            steps {
                initialSetup()
                sh 'npm install'
                script {
                    def status = sh script: 'npm run testArgs', returnStatus: true
                    println("npm run testArgs: exit(${status})")
                }
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
                        initialSetup()
                        sh 'npm install'
                        script {
                            def status = sh script: 'npm run testOutput1', returnStatus: true
                            println("npm run testOutput1: exit(${status})")
                        }
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
                        initialSetup()
                        sh 'npm install'
                        script {
                            def status = sh script: 'npm run testOutput2', returnStatus: true
                            println("npm run testOutput2: exit(${status})")
                        }
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
                        initialSetup()
                        sh 'npm install'
                        script {
                            def status = sh script: 'npm run testMessageHandling', returnStatus: true
                            println("npm run testMessageHandling: exit(${status})")
                        }
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
            finalizeSuccess('mathematicaclitool', null, env.VERSION)
        }
        failure {
            finalizeFail()
        }
    }
}
