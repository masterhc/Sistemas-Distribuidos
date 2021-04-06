let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('express')()
const apiRoutes = require("./routes/routes")
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect to DB
const dbPath = 'mongodb://localhost/bioApp';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(dbPath, options).then(console.log('Connected')).catch(e=>console.log(e));

//Set /api to the routes file
app.use('/api', apiRoutes)


app.listen(port, ()=>{console.log("Server UP");});

