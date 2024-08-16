const mongoose = require('mongoose');
var fetusSchema = mongoose.Schema({
    id : Object,
    week16Mass : Number,
    week16Length : Number, 
    week32Mass : Number, 
    week32Length : Number, 
   
});
var Fetus = mongoose.model("Fetus",fetusSchema);
module.exports = Fetus;


