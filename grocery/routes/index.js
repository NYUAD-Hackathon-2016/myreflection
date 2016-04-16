var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Expression' });
});

/* GET post page. */
router.get('/post', function(req, res, next) {
  var tweet = JSON.parse(req.body);
  //POST TWEET
  res.json({status: 'OK'});
});

module.exports = router;
