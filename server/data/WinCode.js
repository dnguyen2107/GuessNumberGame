var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define the ideaSchema
var winCodeSchema = new Schema(
    {
        code: String
    });


// Export the idea model
exports.WinCode = mongoose.model('WinCode', winCodeSchema);
