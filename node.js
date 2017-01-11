const http = require('http');
const fs = require('fs');
const port = 3000;
const fileNotFound = 404;
const available = 200;
const jsonFile1 = 'file1.json';
const jsonFile2 = 'file2.json';

const server = http.createServer(requestHandle).listen(port,function(err){
  if(err){
    return console.log('Sorry Server not created', err);
  }
  console.log(`server is listening on ${port}`);
});

function requestHandle(request,response){

  if(request.url === '/'){
      fs.readFile(jsonFile1, function(err, data){
        if(err){
          response.writeHead(fileNotFound);
          response.write("Not Found");
        }else{
          response.writeHead(available, {'Content-Type': 'text/html'});
          //response.write(data);
          var obj = JSON.parse(data);
          for(var key in obj){
            response.write(key+' : '+obj[key]+'<br>');
          }
        }

      });

      fs.readFile(jsonFile2, function(err, data){
        if(err){
          response.writeHead(fileNotFound);
          response.write("Not Found");
        }else{
          response.write('<br>');
          var obj = JSON.parse(data);
          for(var key in obj){
            response.write(key+' : '+obj[key]+'<br>');
          }
        }

        response.end();
      });
  }

}

// if(request.url === '/callServ'){
//     var body = '';
//
//     request.on('data', function(chunk){
//       body += chunk;
//     });
//
//     request.on('end', function(){
//       response.writeHead(available, {'Content-Type': 'text/html'});
//       response.write('<h2>Welcome</h2>');
//
//       var content = body.split('&');
//
//       var name = '';
//       for(var i = 0;i < content.length-1;i++){
//         var particularName = content[i].split('=');
//         name += particularName[1]+' ';
//       }
//
//       response.write('<h1>'+name+'</h1>');
//       response.end();
//     });
// }
