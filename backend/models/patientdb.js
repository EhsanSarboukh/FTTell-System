const mongoose = require('mongoose');

var patientSchema = mongoose.Schema({
    id : Object,
    birthDate:Date,
    ageInMonth:Number,
    alergics:String,
    motherHeight: Number,
    motherWeight: Number,
    motherAge:Number,
    gender : String,
    birthWeight :{ type: Number, default: 0 },
    Month6Weight : { type: Number, default: 0 },
    Month12Weight :{ type: Number, default: 0 },
    Month18Weight : { type: Number, default: 0 },
    Month24Weight : { type: Number, default: 0 },
    Month36Weight : { type: Number, default: 0 },
    Month48Weight : { type: Number, default: 0 },
    Month60Weight : { type: Number, default: 0 },
    result : String
});
var Patient = mongoose.model("Patient",patientSchema);
module.exports = Patient;