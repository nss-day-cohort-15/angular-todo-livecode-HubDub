"use strict";
//this creates the angular module variable. when we added angular-route to the app, we have to add it here in the array as a dependency "ngRoute". we also have to add it as a script tag in html and make sure we've downloaded it in our bower components. when he's talking about routing he is not talking about how we get to a file, but he is talking about how it looks in the url.
var app = angular.module("TodoApp", ["ngRoute"]);
//this is where we set up things we need to happen before the app runs, in the config. in this case we are going to tell it "when the route is this use this partial". when takes the route and an object as an argument. the object contains the partial. note that the U is cap the rl is not. this is where we match the url template and the controller.
app.config(function($routeProvider) {
  $routeProvider.
    when('/items/list', {
      templateUrl: 'partials/item-list.html',
      // controller: 'TodoCtrl' //now that we're making factories we're not using this
      controller: "ItemListCtrl"
    }).
    when('/items/new', {
      templateUrl: 'partials/item-form.html',
      controller: 'ItemListCtrl'
    }).
    //now we can add some protection for if there is a rouge link or user tries to add things to route to poke around your domain
    otherwise('/items/list');
});