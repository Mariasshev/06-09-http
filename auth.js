const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {

    if(req.method == 'POST' && req.url == '/submit')
        {
           // console.log('in parse block');
            let inf = '';
            req.on('data', part =>{
                inf += part.toString();
            })
    
            req.on('end', () => {
    
                const parseData = querystring.parse(inf);
                
                console.log(JSON.stringify(parseData, null, 2));
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