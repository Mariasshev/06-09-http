var http = require('http');
var url = require('url');
var fs = require('fs');
const querystring = require('querystring');


http.createServer(function(req, res){


    if(req.method == 'POST' && req.url == '/submit')
    {
        console.log('in data');
        let inf = '';
        req.on('data', chunk =>{
            inf += chunk.toString();
        })

        req.on('end', () => {
            const parseData = querystring.parse(inf);
            console.log(parseData);
            var path = url.parse(req.url).pathname;
            path = 'html/' + 'index.html';
    
            fs.readFile(path, function(err, data){
                if(err){
                    console.log(err);
                    res.writeHead(404, { 'Content-Type' : 'text/html'});
                    res.end('Not Found!');
                }
                else{
                   
                    res.writeHead(200, { 'Content-Type' : 'text/html'});
                    res.write(data.toString());
                    console.log('new data was sent!');
                    res.end();
                }
            })

        })
    
    }
    else{
        var path = url.parse(req.url).pathname;
        path = 'html/' + 'form.html';

        fs.readFile(path, function(err, data){
            if(err){
                console.log(err);
                res.writeHead(404, { 'Content-Type' : 'text/html'});
                res.end('Not Found!');
            }
            else{
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.write(data.toString());
                console.log('data was sent!');
                res.end();
            }
        })
    }


}).listen(8040, function(){
    console.log('Server starting!');
})