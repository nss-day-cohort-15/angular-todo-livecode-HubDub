"use strict";

app.controller("TopCtrl", function($scope, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;

let currentUser = null;

//onAuthStateChanged is a watcher built into firebase.auth
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      currentUser = user.uid;
      //piggybacking on this to get the user id for saving items with a userId
      $scope.isLoggedIn = true;
      console.log("current user logged in?", user.uid);
      //for below, I missed some of this but you have to do this

    } else {
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
    }
    $scope.$apply();
  });

  $scope.getUser = function () {
    return currentUser;  //I was tentatively setting this up in AuthFactory, which is also ok. we need this in other controllers so we'll go there and set these up.
  };

  $scope.logout = function() {
    AuthFactory.logoutUser()
      .then(function(data) {
        console.log("logged out", data);
      });
  };
});