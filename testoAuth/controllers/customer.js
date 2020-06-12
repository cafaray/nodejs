var Customer = require('../models/customer');

// Create endpoint /api/beers for POSTS
exports.postCustomer = function(req, res) {
    // Create a new instance of the Beer model
    var customer = new Customer();
  
    // Set the beer properties that came from the POST data
    
    
    customer.firstName = req.body.firstname;
    customer.lastName = req.body.lastname;
    customer.branch = req.body.branch;
    customer.email = req.body.email;
    customer.mobile_number = req.body.mobile_number;
    // Save the customer and check for errors
    customer.save(function(err) {
      if (err){
        res.send(err);
      }
      res.json({ message: 'Customer added to the database!', data: customer });
    });
}

exports.getCutomer = function(req, res){
    console.log('searching for ' + req.params.customer_id);
    Customer.find( {_id: req.params.customer_id}, function(err, customer){
        if(err){
            res.send(err);
        }
        console.log('got it, ' + customer);
        res.json(customer);
    });
}

exports.getCustomers = function(req, res) {
    Customer.find(function(err, customers){
        if(err){
            res.send(err);
        }
        res.json(customers);
    });
}