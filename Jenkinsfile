#!groovy

node {
  stage('Unit Test') {
    checkout scm
    sh 'node test-server.js &'
    PAGE_OUTPUT = sh (
      script: 'curl localhost:8888',
      returnStdout: true
    ).trim()

    if(${PAGE_OUTPUT}.indexOf('Hello, World!')) {
      println "Test Worked"
    }
    else {
      println "Test failed"
    }
  }
}