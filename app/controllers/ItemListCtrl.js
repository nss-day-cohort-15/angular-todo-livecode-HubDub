"use strict";
//this will take both scope and our item factory as arguments.
app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData) {
  $scope.searchText = SearchTermData;
  let user = $scope.$parent.getUser();
  //initially he was just passing this in to getItemList below but since we need to pass it in both of these functions we went ahead and made a variable above to pass in
  ItemStorage.getItemList(user)
    .then((itemCollectionArray) => {    //return the promise
      console.log("getItemList", itemCollectionArray);
      $scope.items = itemCollectionArray;
  });

  $scope.itemDelete = (itemId) => {
    console.log(itemId);
    ItemStorage.deleteItem(itemId)
      .then( (response) => {
        ItemStorage.getItemList(user)
        .then( (itemCollectionArray) => {
          $scope.items = itemCollectionArray;
        });
      });
  };



});

