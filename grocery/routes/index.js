var express = require('express');
var router = express.Router();
var sentimentAnalysis = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
