const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = 
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
        email: {
            type: String,
            required: true
        },
        cellphone:{
            type:String,
            required:true,
            max:13,
        },
        owner:{
            type: Boolean,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }
);




const User = module.exports = mongoose.model('User', userSchema);

module.exports.get = (callback, limit)=>
{
   User.find(callback).limit(limit); 
}