"use strict";
//this will take both scope and our item factory as arguments.
app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData) {
  $scope.searchText = SearchTermData;

  ItemStorage.getItemList()
    .then((itemCollection) => {    //return the promise
      $scope.items = itemCollection;
  });
});

//since we added the search factory we need to add search data to this controller as well