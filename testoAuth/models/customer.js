var mongoose = require('mongoose');

// Define our customer schema
var CustomerSchema   = new mongoose.Schema({
    firstName: String,
    lastName: String,
    branch: Number,
    address: {
        avenue: String, 
        number: String, 
        interior: String, 
        cp: String, 
        state: String, 
        countryCode: Number, 
        referrence: String 
    }, 
    email: String,
    mobile_number: String
});

// Export the Mongoose model for Customers
module.exports = mongoose.model('Customer', CustomerSchema);