const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title: 'Calc API',
            version: '1.0.0'
        }
    },
    apis: ['app.js'],
};

const swaggerCalc = swaggerJsDoc(swaggerOptions);
console.log(swaggerCalc)
app.use('/api-calc',swaggerUI.serve, swaggerUI.setup(swaggerCalc));

/**
 * @swagger
 * /sum/:sum1/:sum2:
 *   get:
 *     description: Get all
 *     parameters:
 *       - in: path
 *         name: sum1
 *         schema: 
 *           type: number
 *         required: true
 *       - in: path
 *         name: sum2
 *         schema: 
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         name: result
 *         description: Success
 * 
 */

app.get('/sum/:sum1/:sum2',(req,res)=>{
   
    var result = parseInt(req.params.sum1)+ parseInt(req.params.sum2);
    res.send(result.toString())
})

app.listen(5000, ()=> console.log('listening on 5000'));