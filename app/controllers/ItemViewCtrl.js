"use strict";

app.controller("ItemViewCtrl", function ($scope, ItemStorage, $routeParams) {
  //routerParams is a service that gives us access to whatever is in URL bar

  $scope.Items = [];

  ItemStorage.getItemList($scope.$parent.getUser())
    .then( (itemCollectionArray) => {
      console.log("getItemList", itemCollectionArray);
      $scope.items = itemCollectionArray;

      $scope.selectedItem = $scope.items.filter(function(item) {
        return item.id === $routeParams.itemId;
      })[0];
      console.log("after then in getItemList", $routeParams.itemId);
      //filter takes an existing array and makes a new array based on a certain criteria. in this case we're going to filter on the id that we added in the item factory. since teh filter function always returns an array of one item we have to add the [0 to access the array and get at the object inside]
    });
});