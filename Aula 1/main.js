

const port = process.env.PORT || 8080;
const request = require('request');
const express = require('express');
var app  = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//routes  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const apiKey = process.env.OpenWeatherKey  || 'd9cc792e72e0f898ef4621b7cc7abce3';
const Cidade = 'Guarda';

app.get('/', (req, res)=>
{   
    res.render('index', ()=>
    {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${Cidade}&appid=${apiKey}&units=metric`
        request(url, (err, r, b)=>
        {
            if(err) return err;
            try {
                res.send(JSON.parse(b).main.temp);
            } catch (e) {
                console.log (e);
            }
            
        });
    })
})

app.listen(port,()=> 
{
    console.log(`Server Up`);
});

