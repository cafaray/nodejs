var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express', passport: 'x09old4jf72bnsf832nxdrwa' });
});

module.exports = router;
