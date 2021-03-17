

const http = require('http');
const port = process.env.PORT || 8080;
const request = require('request');



const apiKey = 'd9cc792e72e0f898ef4621b7cc7abce3';
const cidade = 'Guarda';
http.createServer( (req, res)=>
{
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`
     
    request(url, (err, r, b)=>
    {
        var payload;
        if(err) console.log('error:', error);
        try {
            payload = JSON.parse(b).main.temp;
        } catch (e) {
            console.log('JSON.parse Error',e)   
        }
        res.write('Na cidade: '+cidade+' estão: '+payload+'℃');
        res.end();
    });
}).listen(port , ()=>
{
    console.log('Server Up')
});

