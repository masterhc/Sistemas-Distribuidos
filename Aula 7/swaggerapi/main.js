const app = require('express')();
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 5000;
const mongoPW = process.env.MONGOPW || 'admin';
const mongoDB = process.env.MONGODB_URI || `mongodb+srv://admin:${mongoPW}@cluster0.hrgvn.mongodb.net/restaurants?retryWrites=true&w=majority`;

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"DeliveryAPI",
            version:"1.0.8",
            description:"Api for organizing multiple restaurants and their menus."
        },
        servers:
        [
            {url:`http://localhost:${PORT}`}
        ],
    },
    apis: ["./api/*/*.js"]
}
const specs =  require('swagger-jsdoc')(options);

app.use(require('cors')());
app.use(require('express').json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/', require('./routes/routes'));

app.listen(PORT, ()=>
{
    console.log('Server UP')
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).then(console.log('MONGODB: Connected')).catch(err=>console.log(err));
});
