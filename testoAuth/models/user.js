var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true //,
      //unique: true  
    }
});

/**
 * this funtiont will be disabled until Digest strategy works
 * - one of the disadventages working with digest is not
 * store the password as hash
 */

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
    var user = this;
  
    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
  
    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);
  
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return callback(err);
        user.password = hash;
        callback();
      });
    });
});


UserSchema.methods.verifyPassword = function(password, cb) {
  var user = this;  
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (err) return cb(err);        
    cb(null, isMatch);
  });
};


// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);