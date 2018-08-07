var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ES6 syntax
router.get('/admin', (req, res, next)=>{
	res.render('admin');
});

module.exports = router;
