var sentimentValue;

function getSentimentFromTweet(tweet){
        console.log("I am in functiuo");
        //var tempTweet = "Life is life. I am full of love!";ue;

        $.ajax({
          type: "POST",
          url: "http://localhost:3000/post",
          data: JSON.stringify({ status: tweet }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {
            sentimentValue = data.status;

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
      getSentimentFromTweet(text);
      console.log(sentimentValue);
      $('#textBox').css( "border", "solid" );
      if (sentimentValue > 0){
        $('#textBox').css( "border-color", "green" );
      } else if (sentimentValue < 0){
        $('#textBox').css( "border-color", "red" );
      }else{
        $('#textBox').css( "border-color", "blue" );
      }

}