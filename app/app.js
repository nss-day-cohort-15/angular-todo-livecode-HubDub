"use strict";

var app = angular.module("TodoApp", ["ngRoute"])
  .constant("FirebaseUrl", "https://to-do-list-ea290.firebaseio.com/");
  //we add the .constant to chain it to the angular app, making it a variable we can use everywhere and then add in our firebase database address. we're chaining so we don't need a , after line 3. we could literally bck line 4 up to the end of line 3.

let isAuth = (AuthFactory) => new Promise( (resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    console.log("authenticated user");
    resolve();
  } else {
    console.log("not authenticated user");
    reject();
  }
});

app.config(function($routeProvider) {
  $routeProvider.
    when('/',  {
      templateUrl: "partials/login.html",
      controller: "LogInCtrl"
    }).
    //the above is for when the page loads and there are no other subroutes, just home ('/')
    when('/login', {
      templateUrl: "partials/login.html",
      controller: "LogInCtrl"
    }).
    when('/items/list', {
      templateUrl: 'partials/item-list.html',
      controller: "ItemListCtrl",
      resolve: {isAuth}
      //resolve protects our address from hacking resolve tells it to wait until something happens and then take that value and inject it as a dependency. here we can write a promise to check to see if someone is authenticated and if not the promise will not resolve so the route will not load
    }).
    when('/items/new', {
      templateUrl: 'partials/item-form.html',
      controller: 'ItemNewCtrl',
      resolve: {isAuth}
    }).
    //now well add so we can see items-details partial when you click the item. the : becomes a variable and tells the router that anything after items/ will be saved itno this variable itemId so we can do stuff to it
    // when('/items/edit/:itemId', {
    //   templateUrl: 'partials/item-edit-form.html',
    //   controller: 'ItemEditCtrl',
    //   resolve: {isAuth}
    // }).
    when('/items/:itemId', {
      templateUrl: "partials/item-details.html",
      controller: "ItemViewCtrl",
      resolve: {isAuth}
    }).
    when('/items/view/:itemId/edit', {
      templateUrl: "partials/item-form.html",
      controller: "ItemEditCtrl",
      resolve: {isAuth}
    }).
    //this is how he connected the item form to the ItemEditCtrl.
    otherwise('/');
});

app.run( ($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});