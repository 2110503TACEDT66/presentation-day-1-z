const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please add a name'],
        unique : true,
        trim : true,
        maxlength : [50,'Name can not be more than 50 charracters']
    },
    address:{
        type: String,
        required : [true,'Please add an address']
    },
    district:{
        type:String,
        required : [true,'Please add a district']
    },
    province:{
        type : String,
        required : [true,'Please add a province']
    },
    postalcode:{
        type: String,
        required: [true,'Please add a postalcode'],
        maxlength:[5,'Postal Code can not be more than 5 digits']
    },
    region : {
        type: String,
        required: [true, 'Please add a region'] 
    },
    website : {
        type: String,
        required: [true, 'Please add a website']
    },
    description : {
        type: String,
        required: [true, 'Please add a description']
    },
    tel : {
        type: String,
        required: [true, 'Please add a tel']
    }
})

module.exports = mongoose.model('Company',CompanySchema); 