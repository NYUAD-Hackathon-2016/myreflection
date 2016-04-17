var sentimentValue;
var sentimentList;
var positiveList = ["That sounds good! Go ahead and share it with the world!", "I am sure someone would be happy to read this.", "This brings a smile to the heart."];
var negatveList  = ["These can hurt someone.", "Readings this can spark a fight.", "Please read what you wrote once again."];

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getSentimentFromTweet(tweet, callback){
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/post",
    data: JSON.stringify({ status: tweet }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      sentimentValue = data.status;
      if(callback){
        callback();
      }
    },
    error: function(error) {
      console.log("ERROR");
      console.log(error);
    }
  });
}


function check(length, callback) {
  if (sentimentList.length === length) {
    positive_count = 0;
    negative_count = 0;
    neutral_count = 0;
    average = 0;
    for(var i = 0; i < sentimentList.length; i++ ){
          var sentimentValue = sentimentList[i];
          average = average + sentimentValue;
          if(sentimentValue > 0){
            positive_count++;
          } else if (sentimentValue < 0 ){
            negative_count++;
          }else{
            neutral_count++;
          }
        }
        average = average / sentimentList.length;
        Cookies.set('positive',positive_count);
        Cookies.set('negative',negative_count);
        Cookies.set('neutral',neutral_count);
        console.log(Cookies.get('positive'));

        return callback([positive_count, negative_count, neutral_count]);
  } else {
    setInterval(check.bind(null, length, callback), 1000);
  }
}
var getSentimentFromList = function(list, callback){
        console.log("I am in function");

        positive_count = 0;
        negative_count = 0;
        neutral_count = 0;
        average = 0;

        sentimentList = [];

        //var tempTweet = "Life is life. I am full of love!";ue;
        for(var i = 0; i < list.length; i++ ){
          getSentimentFromTweet(list[i]);
          average = average + sentimentValue;
          if(sentimentValue > 0){
            positive_count++;
          } else if (sentimentValue < 0 ){
            negative_count++;
          }else{
            neutral_count++;
          }
        }
        average = average / list.length;

        if (callback) {
          setInterval(check.bind(null, list.length, callback), 1000);
        }

        return [positive_count, negative_count, neutral_count];
}
window.getSentimentFromList = getSentimentFromList;

$(window).on("input", function() {
    updateText();

});

function updateText(){
    var text = $('#textBox').val();
     
      getSentimentFromTweet(text, function(){

        $('#textBox').css( "border", "solid" );
        $('#textBox').css( "border-width", "10px");
        
        $('#happy').css( "display", "none");
        $('#sad').css( "display", "none");
        $('#netural').css( "display", "none");


        if (sentimentValue > 0){
          $('#textBox').css( "border-color", "#66FF00");

          $('#happy').css( "display", "inline");
          $('#sad').css( "display", "none");
          $('#netural').css( "display", "none");

        } else if (sentimentValue < 0){
          $('#textBox').css( "border-color", "#FF0033");

          $('#sad').css( "display", "inline");
          $('#happy').css( "display", "none");
          $('#netural').css( "display", "none");

        }else{
          $('#textBox').css( "border-color", "#3300FF");
          $('#netural').css( "display", "inline");
          $('#happy').css( "display", "none");
          $('#sad').css( "display", "none");
        }
      });
}
function generateTweet(){
  $('#textBox').css( "border-color", "pink");
  var tweet = ($('#textBox').val());
  text = tweet.split(' ');
  var link = 'https://twitter.com/intent/tweet?text=';
  for (var i=0; i <text.length; i ++){
    if(i != text.length -1){
      temp = text[i] + '%20';
    }
    //prevent trailing space
    else {
      temp = text[i];
    }
    link += temp;
  }
  window.location.href=link;
  //window.location.replace(link);
}
