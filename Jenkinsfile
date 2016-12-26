#!groovy

node {
  stage('Local Test') {
    //Checkout source
    checkout scm
    //Run local node use and die test server to sanity checkout our code before pushing to cloud.
    sh 'node test-server.js &'
    def page_output = sh (
      script: 'curl localhost:8888',
      returnStdout: true
    ).trim()

    if(page_output.indexOf('Hello, World!')) {
      println "Test Worked"
    }
    else {
      error 'Test Failed'
    }
  }
  stage('Remote Test') {
    echo 'Should run'
  }
}