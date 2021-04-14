const mongoose = require('mongoose');
const item = require('./itemmodel')
const Schema = mongoose.Schema;

let menu = module.exports = new Schema({
    menu_size:{
        type:Number,
        required:true
    },
    menu_items:{
        type: item,
        required:true
    }
})

