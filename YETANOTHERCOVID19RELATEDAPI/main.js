let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('express')();
const got = require('got');
Model = require('./models/model')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect to DB
const dbPath = 'mongodb://localhost/covid19cases';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(dbPath, options).then(console.log('Data Base connected')).catch(e=>console.log(e));

//Set /api to the routes file
app.use('/api', require("./routes/route"))


//FILL DB
//Adicionar os dados sozinho à bd.
async function fillDB() 
{
    try 
    {
        const res = await got('https://covid19-api.vost.pt/Requests/get_entry/29-03-2021_until_04-04-2021');
        let body = JSON.parse(res.body);
        var model = new Model();
        // model.Date = body.data;
        // model.confirmed = body.confirmados;
        // model.newConfirmed = body.confirmados_novos;
        // model.intensiveCare = body.internados_uci;
        // model.save((err)=>
        // {
        //     if (err) console.log(err);
        //     else
        //     {
        //         console.log('Data ADDED')
        //     }
        // });
    } catch (e) 
    {
        console.log(e);    
    }
};

app.listen(process.env.PORT || 5000, ()=>
{
    console.log("Server UP");
    fillDB();
});