var express = require('express');
var router = express.Router();
var sentimentAnalysis = require('sentiment-analysis');

/* GET home page. */
router.post('/', function(req, res, next) {
  
  tweet = req.body.status;
  sentimentValue = sentimentAnalysis(tweet);
  console.log(sentimentValue);
  res.json({status: sentimentValue});
});

module.exports = router;
