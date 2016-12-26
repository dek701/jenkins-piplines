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
      println "Local Test Worked"
    }
    else {
      error 'Local Test Failed'
    }
  }
  stage('Remote Test') {
    def droplet_id = ""

    try {
      // Create remote test server on digital ocean.
      def return_status = sh (
        script: "/usr/local/bin/doctl compute droplet create TESTINSTANCE.gnuchu.com --no-header --image ubuntu-16-10-x64 --region lon1 --size 512mb --ssh-keys 5411121 --wait",
        returnStatus: true
      )

      if(return_status!=0) {
        error "Droplet not created. Please investigate."
      }

      //Dig out the IP for our newly created server.
      def ip_address = sh (
        script: "/usr/local/bin/doctl compute droplet list --no-header --format PublicIPv4 TESTINSTANCE.gnuchu.com",
        returnStdout: true
      ).trim()
      
      println "IP Address is: " + ip_address      

      droplet_id = sh (
        script: '/usr/local/bin/doctl compute droplet list --format ID --no-header TESTINSTANCE.gnuchu.com',
        returnStdout: true
      ).trim()

      println "Droplet ID is: " + droplet_id

      def text_line = '[TESTINSTANCE.gnuchu.com]\n' + ip_address
      writeFile file: './hosts', text: text_line 

      // Install apache2 and copy project to remote server using ansible

      def ansible_command = "ansible-playbook -i ./hosts test-server.yml"
      def test_env_build = sh (
        script: ansible_command,
        returnStatus: true
      )
      if(test_env_build!=0) {
        error "Failure in test environment build."
      }

      def test_curl = 'curl ' + ip_address
      def page_output = sh (
        script: test_curl
        returnStdout: true
      ).trim()

      if(page_output.indexOf('Hello, World!')) {
        println "Remote Test Worked"
      }
      else {
        error 'Remote Test Failed'
      }

    }
    finally {
      // Clean up - Delete test instance
      def delete_script = "/usr/local/bin/doctl compute droplet delete " + droplet_id + " --force"
      def deleted = sh (
        script: delete_script,
        returnStatus: true
      )
      
      if(deleted!=0) {
        error "Droplet not deleted. Please investigate."
      }
    }
  }
}