"use strict";


app.controller("NavCtrl", function($scope, SearchTermData, $location) {
  $scope.searchText = SearchTermData;
  $scope.navItems = [
    {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
    {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"},
    {url: "#/items/list", name: "All Items", showState: "$parent.isLoggedIn"},
    {url: "#/items/new", name: "New Items", showState: "$parent.isLoggedIn"}
  ];

  $scope.isActive = (viewLocation) => viewLocation === $location.path();

//since it's a one line code we don't neet the {} or the word return
});

//since navCtrl needs access tothe filter factory we'll inject it in as an argument in this function. need to add$location into argument since it wil ltell us our current location.