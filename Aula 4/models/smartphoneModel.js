const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SmartphoneSchema = 
new Schema(
    {
    name: {type: String, required: true, max: 100},
    brand: {type: Number, required: true},
    }
);



const SP = module.exports = mongoose.model('Smartphone', SmartphoneSchema);

module.exports.get = (callback, limit)=>
{
   SP.find(callback).limit(limit); 
}