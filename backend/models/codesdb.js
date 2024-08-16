var mongoose = require('mongoose');


var codesSchema = mongoose.Schema({
    code : Object,

   
});
var Code = mongoose.model("Code",codesSchema);
module.exports = Code;
