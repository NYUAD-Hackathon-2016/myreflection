// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngTwitter'])

/*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})*/

.controller('AppCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth) {
  var twitterKey = 'STORAGE.TWITTER.KEY';
  var clientId = 'gkz0JYaCVkxWRdG0jVJONclzD';
  var clientSecret = 'RDmlx6TlYJKxt4VLcQog3m9LP9mwPFO6tdJTisriRWg7YllEPh';
  var myToken = '';

  $scope.tweet = {};

  // Automatically start the OAuth dialog if no token was found
  $ionicPlatform.ready(function() {
    myToken = JSON.parse(window.localStorage.getItem(twitterKey));
    if (myToken === '' || myToken === null) {
      $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
        myToken = succ;
    document.getElementById("displayer1").innerHTML = JSON.stringify(myToken);
        window.localStorage.setItem(twitterKey, JSON.stringify(succ));
        $twitterApi.configure(clientId, clientSecret, succ);
        $scope.showUserTimeline();
      }, function(error) {
        console.log(error);
      });
    } else {
      $twitterApi.configure(clientId, clientSecret, myToken);
      $scope.showUserTimeline();
    }
  });

  $scope.showUserTimeline = function() {
      $twitterApi.getUserTimeline({
        screen_name: myToken.screen_name, count: 100
      }).then(function(data) {
        var list = [];
        data.forEach(function(tweet) {
          list.push(tweet.text);
        })
        window.getSentimentFromList(list, function(result) {
          window.datas = result;
          $.FlotChart.createPieGraph("#pie-chart #pie-chart-container", ["Positive", "Negative", "Neutral"], result, ["#3bafda", "#CF4647", "#CACACA"]);
          document.getElementById("displayer1").innerHTML = result;//JSON.stringify(result);
        })
      });
};

  /*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})*/

});
