const app = require('express')();
const swaggerUI = require('swagger-ui-express');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./public/api/swaggerdoc.json')));
app.use('/api/', require('./routes/routes'));
app.listen(process.env.PORT || 5050, ()=>{console.log('Server UP')});