
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use('/', require('./routes/indexRoute'));

app.listen(port, function(){console.log("Server Up")});