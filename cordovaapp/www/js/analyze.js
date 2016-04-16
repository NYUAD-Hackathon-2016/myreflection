function getSentimentFromTweet(tweet){
        console.log("I am in functiuo");
        //var tempTweet = "Life is life. I am full of love!";
        var sentimentValue = 10;
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/post",
          data: JSON.stringify({ status: tweet }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {
            console.log("SUCCESS");
            sentimentValue = data.status;
            console.log(sentimentValue);
          },
          error: function(error) {
            console.log("ERROR");
            console.log(error);
          }
        });
}

window.addEventListener("keypress", checkKeyPressed, false);
 
function checkKeyPressed(e) {
      var text = $('#textBox').val();
      console.log(text);
      getSentimentFromTweet(text);
  
}