const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vaccine = 
new Schema(
    {
        name: {type: String, required: false, max: 100},
        dose_1: {type:Boolean, required: true},
        dose_2:{type:Boolean, required: true},
        naturalRecovery:{type:Boolean, required: true},
        Update:{type:Date, required:true}
    }
);



const Vac = module.exports = mongoose.model('Vaccine', vaccine);

module.exports.get = (callback, limit)=>
{
   Vac.find(callback).limit(limit); 
}