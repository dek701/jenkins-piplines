// Simple test server that will serve up our page and then die, for simplicities sake. 
// We're model local test here so we can compate to scale test later.

var http = require('http');
var fs = require('fs');

const PORT = 8999;
var server = http.createServer();

server.on('request', function(req,res) {
  fs.readFile('./index.html', function(error, content) {
    if(error){
      res.writeHead(500);
      res.write("Unknown error");
      res.end();
      server.close();
    }
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end("","", function(){
        server.close();
      });
    }
  });
});

server.listen(PORT, function(){
  console.log("Listening on port: %s", PORT);
});
