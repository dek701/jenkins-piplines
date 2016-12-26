#!groovy

node {
  //Checkout source - don't put into a stage as we want to use same checkout for all stages - just in case someone checks in while we're testing.
  checkout scm

  stage('Local Test') {
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
    def return_status = sh (
      script: "/usr/local/bin/doctl compute droplet create TESTINSTANCE.gnuchu.com --no-header --image ubuntu-16-10-x64 --region lon1 --size 512mb --ssh-keys 5411121 --wait",
      returnStatus: true
    )

    echo return_status
  }
}