var sentimentValue;
var positiveList = ["That sounds good! Go ahead and share it with the world!", "I am sure someone would be happy to read this.", "This brings a smile to the heart."];
var negatveList  = ["These can hurt someone.", "Readings this can spark a fight.", "Please read what you wrote once again."];

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

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

window.addEventListener("keyup", checkKeyPressed, false);
function getSentimentFromList(list){
  console.log("I am in function");
  positive_count = 0;
  negative_count = 0;
  netrual_count = 0;
  average = 0;
  //var tempTweet = "Life is life. I am full of love!";ue;
  for(var i = 0; i < list.length; i++ ){
    getSentimentFromTweet(list[i]);
    average = sentimentValue;
    if(sentimentValue > 0){
      positive_count++;
    } else if (sentimentValue < 0 ){
      negative_count++;
    }else{
      negative_count++;
    }
  }
  average = average / list.length;
  return [positive_count, negative_count, netrual_count, average];
}


function checkKeyPressed(e) {
  var text = $('#textBox').val();
  getSentimentFromTweet(text);
  console.log(sentimentValue);
  console.log(text);
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
}
/*
   red = 0;
   green = 0;
   blue = 0;
   negativeSentMax = -1;
   positiveSentMax = 1;
   sentMin = 0;
   modifier = 1;
   if (sentimentValue > 0){
   green = sentimentValue * modifier * 255;
   if (green > 255){green = 255}
   blue = 255 - green;
   } else {
   red = sentimentValue * -modifier * 255;
   if (red > 255){red = 255}
   blue = 255 - red;
   }

   $('#textBox').css( "border", "solid" );
   if (sentimentValue > 0){
   $('#textBox').css( "border-color", rgbToHex(red,green,blue));
   } else if (sentimentValue < 0){
   $('#textBox').css( "border-color", rgbToHex(red,green,blue));
   }else{
   $('#textBox').css( "border-color", rgbToHex(red,green,blue));
   }
   */
