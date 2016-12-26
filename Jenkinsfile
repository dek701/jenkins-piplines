#!groovy

node {
  stage('Unit Test') {
    checkout scm
    sh 'node test-server.js &'
    def page_output = sh (
      script: 'curl localhost:8888',
      returnStdout: true
    ).trim()

    if(page_output.indexOf('Hello, World!')) {
      println "Test Worked"
    }
    else {
      println "Test failed"
    }
  }
}