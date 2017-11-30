var express = require('express');
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res) {
    //console.log(req),
    //console.log(req.body.name);
    console.log(req.body);
    res.render('user', { message: 'Record was succesfully generated' });
});

module.exports = router;