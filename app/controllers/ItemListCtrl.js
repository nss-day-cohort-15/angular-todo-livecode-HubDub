"use strict";
//this will take both scope and our item factory as arguments.
app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData) {
  $scope.searchText = SearchTermData;

  ItemStorage.getItemList()
    .then((itemCollectionArray) => {    //return the promise
      console.log("getItemList", itemCollectionArray);
      $scope.items = itemCollectionArray;
  });

  $scope.itemDelete = (itemId) => {
    console.log(itemId);
    ItemStorage.deleteItem(itemId)
      .then( (response) => {
        ItemStorage.getItemList()
        .then( (itemCollectionArray) => {
          $scope.items = itemCollectionArray;
        });
      });
  };
});

