#!groovy

node {
  stage('Unit Test') {
    checkout scm
    sh 'node test-server.js &'
    PAGE_OUTPUT = sh 'curl localhost:8888'
    echo "${PAGE_OUTPUT}"
  }
}