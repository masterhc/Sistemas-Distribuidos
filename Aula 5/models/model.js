var mongoose = require('mongoose');

//schema
var terraceSchema = mongoose.Schema({
    cafe: {
        type: String,
        required: true
    },
    maxseats: {
        type: Number,
        required: true
    },
    usedseats: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Terrace Model
var Terrace = module.exports = mongoose.model('Terrace', terraceSchema);

module.exports.get = (callback, limit) =>
{
   Terrace.find(callback).limit(limit); 
}