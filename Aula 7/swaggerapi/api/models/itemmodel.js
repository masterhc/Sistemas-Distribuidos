const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let item = module.exports = new Schema({
    item_name:{
        type: String,
        required:true
    },
    item_price:{
        type: String,
        required:true
    },
    item_description:{
        type:String,
        required:true
    }
})
