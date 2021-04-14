var mongoose = require('mongoose');

//schema
var casesSchema = mongoose.Schema({
    Date: {
        type: Object,
        required: true
    },
    newConfirmed: {
        type: Object,
        required: true
    },
    intensiveCare: {
        type: Object,
        required: true
    }
});

// Export Terrace Model
var Cases = module.exports = mongoose.model('Cases', casesSchema);

module.exports.get = (callback, limit) =>
{
   Cases.find(callback).limit(limit); 
}