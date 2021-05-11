const app = require('express')();
const swaggerUI = require('./costum_modules/swagger-ui-express');
const mongoose = require('mongoose')

app.use(require('cors')());
app.use(require('express').json());

const mongoPW = process.env.MONGOPW || 'admin';
const mongoDB = process.env.MONGODB_URI || `mongodb+srv://admin:${mongoPW}@cluster0.hrgvn.mongodb.net/vaccines?retryWrites=true&w=majority`;
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./public/api/swaggerdoc.json')));
app.use('/api/', require('./routes/routes'));
app.listen(process.env.PORT || 5050, ()=>
{
    console.log('Server UP')
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).then(console.log('MONGODB: Connected')).catch(err=>console.log(err));
});