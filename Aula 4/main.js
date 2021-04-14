const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoPW = process.env.MONGOPW || 'admin';
const mongoDB = process.env.MONGODB_URI || `mongodb+srv://admin:${mongoPW}@cluster0.hrgvn.mongodb.net/smartphone?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routes/router'));


app.listen(port, ()=>
{
    console.log('Server UP')
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).then(console.log('connected')).catch(err=>console.log(err));
    
})


