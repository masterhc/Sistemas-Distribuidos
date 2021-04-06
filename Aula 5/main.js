let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('express')()


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Connect to DB
const dbPath = 'mongodb://localhost/TerraceOccupancy';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(dbPath, options).then(console.log('Data Base connected')).catch(e=>console.log(e));

//Set /api to the routes file
app.use('/api', require("./routes/routes"))


app.listen(process.env.PORT || 5000, ()=>{console.log("Server UP");});

