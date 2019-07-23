var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

// var message = 'I am so happy to be part of the Node Girls workshop!';

function handler (request, response) {
  var endpoint = request.url;
  console.log(endpoint);

  var method = request.method;
  console.log(method);

  if (endpoint === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }

  else if (endpoint === "/node") {
  //  console.log("wow node time");
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write("wow node time");
    response.end();
  } else if (endpoint === "/girls") {
  //  console.log("node girls just wanna have fun");
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write("node girls just wanna have fun");
    response.end();
  } else if (endpoint === "/create-post" && method === "POST") {
      var allTheData = '';
      request.on('data', function (chunkOfData) {
        allTheData += chunkOfData;
      });
      request.on('end', function () {
        console.log(allTheData);
        var convertedData = querystring.parse(allTheData);
        console.log(convertedData);
        response.writeHead(301, {"Location": "/"})
        response.end();
      });

  }


  else {
    // console.log(endpoint)
    fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
      if (error) {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end();
      }
      else {
        const extension = endpoint.split(".")[1];
        const extensionType = {
          css: "text/css",
          js: "application/javascript",
          ico: "image/x-icon",
          jpg: "image/jpeg",
          png: "image/png"
        };

        response.writeHead(200, {"Content-Type": extensionType[extension]} )
        response.end(file);
      }
    })


      }
}

var server = http.createServer(handler);

server.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
