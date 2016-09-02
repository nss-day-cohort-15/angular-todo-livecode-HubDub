"use strict";

var app = angular.module("TodoApp", ["ngRoute"])
  .constant("FirebaseUrl", "https://to-do-list-ea290.firebaseio.com/");
  //we add the .constant to chain it to the angular app, making it a variable we can use everywhere and then add in our firebase database address. we're chaining so we don't need a , after line 3. we could literally bck line 4 up to the end of line 3.

app.config(function($routeProvider) {
  $routeProvider.
    when('/items/list', {
      templateUrl: 'partials/item-list.html',
      controller: "ItemListCtrl"
    }).
    when('/items/new', {
      templateUrl: 'partials/item-form.html',
      controller: 'ItemNewCtrl'
    }).
    //now well add so we can see items-details partial when you click the item. the : becomes a variable and tells the router that anything after items/ will be saved itno this variable itemId so we can do stuff to it
    when('/items/:itemId', {
      templateUrl: "partials/item-details.html",
      controller: "ItemViewCtrl"
    }).
    otherwise('/items/list');
});