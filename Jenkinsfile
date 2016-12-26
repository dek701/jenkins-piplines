#!groovy

node {
  stage('Local Test') {
    checkout scm
    sh 'node test-server.js &'
    def page_output = sh (
      script: 'curl localhost:8888',
      returnStdout: true
    ).trim()

    if(page_output.indexOf('Hello, World!')) {
      println "Test Worked"
      error 'Test Failed'
    }
    else {
      error 'Test Failed'
    }
  }
  stage('Remote Test') {
    echo 'Should not run'
  }
}