const mongoose = require('mongoose');
const menu = require('./menumodel');
const Schema = mongoose.Schema;
//Separate into its own schema folder
//Gonna be more readable on 
let restaurantSchema = 
new Schema(
    {
        name: {
            type: String,
            required: true,
            max: 100
        },
        hash:{
            type: String,
            required: true,
            max: 64
        },
        geocoords: {
            type: String,
            required: true
        },
        menu: {
            type: menu,
            required:true
        }
    }
);




const Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);

module.exports.get = (callback, limit)=>
{
   Restaurant.find(callback).limit(limit); 
}