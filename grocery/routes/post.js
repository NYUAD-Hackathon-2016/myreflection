var express = require('express');
var router = express.Router();
var sentimentAnalysis = require('sentiment-analysis');
var googleTranslate = require('google-translate')("AIzaSyB674wqMT3IDROs8Q_f42qwR8FAVSRcR6c");

/* GET home page. */
router.post('/', function(req, res, next) {
  
  tweet = req.body.status;


	googleTranslate.translate(tweet, 'en', function(err, translation) {
		console.log(translation.translatedText);
		arabic = translation.translatedText;
		sentimentValue = sentimentAnalysis(arabic);
		console.log(sentimentValue);
		res.json({status: sentimentValue});
	});

});

module.exports = router;
