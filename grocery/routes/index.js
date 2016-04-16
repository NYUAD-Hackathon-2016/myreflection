var express = require('express');
var router = express.Router();
var sentimentAnalysis = require('sentiment-analysis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/post/analyze', function(req, res, next) {
	

	var tweet = "This horrible disgusting test tweet!";

	var tweetSentiment = sentimentAnalysis(tweet2);


});


module.exports = router;
