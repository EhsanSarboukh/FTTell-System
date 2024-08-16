const mongoose = require('mongoose');

var PediatricianSchema = mongoose.Schema({
    id : String,
    username : String,
    password: String,
    medicalClinic: String
});
var Pediatrician = mongoose.model("Pediatrician",PediatricianSchema);
module.exports = Pediatrician;