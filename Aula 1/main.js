

const port = process.env.PORT || 8080; //Defines the port where the server will listen for requests
const request = require('request'); //Makes client like requests to other web servers
const express = require('express'); //Web FrameWork
var app  = express(); 
const cheerio = require('cheerio') //Implementation of JQuery for html manipulation.
const path = require('path'); //Path tool for joining default path with folders.



app.use(express.static(path.join(__dirname, "public"))); //Sets the folder "public" for use when serving the pages to the client.
app.set("view engine", "ejs");//Sets the view engine for express. Ejs is the most popular.

const apiKey = process.env.OpenWeatherMapKey  || 'd9cc792e72e0f898ef4621b7cc7abce3'; //API should be hidden in the ROOT PATH or in a dotEnv file. To do so remove the or and the string.
const City = 'Guarda'; // Sets the city name that will be used when getting a new temperature.

app.get('/', (req, res)=> //When a client asks for the page
{ 
    res.render('index', (err, html)=>  
    {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`
        request(url, (e, r, b)=> //requesting new temperature.
        {
            const $ = cheerio.load(html);
            if(e) res.sendStatus(500); // Error status 500 - Internal Error
            try {
                $('body').append(`<h1> Temperatura na : ${City} é ${JSON.parse(b).main.temp}℃</h1>`); // Appending new temperature to the page's html.
                res.send($.html()); //Actualy Serving the page.
            } catch (e) {
                res.sendStatus(404) // Error status 500 - Internal Error
            }
        });
    })
})
app.listen(port,()=>  //Actually brings the server online
{
    console.log(`Server Up`);
});

