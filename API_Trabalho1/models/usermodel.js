const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = 
new Schema(
    {
        hash:{type:String, required:true, max:64}
    }
)
const User = module.exports = mongoose.model('User', user)
module.exports.get = (callback, limit)=>
{
   User.find(callback).limit(limit); 
}