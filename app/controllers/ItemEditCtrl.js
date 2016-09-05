"use strict";
//this will take both scope and our item factory as arguments.
app.controller("ItemEditCtrl", function($scope, ItemStorage, $routeParams, $location) {
  // let itemId = $routeParams.itemid;
  // console.log(itemId);
  $scope.Items = [];
  ItemStorage.getItemList()
    .then( (itemCollectionArray) => {
      console.log("getItemList", itemCollectionArray);
      $scope.items = itemCollectionArray;
      $scope.selectedItem = $scope.items.filter(function(item) {
        return item.id === $routeParams.itemId;
      })[0];
    });

  $scope.editOneItem = function(task, dueDate, assignedTo, location, urgency, dependencies) {
    console.log("inside editOneItem", task, dueDate, assignedTo, location, urgency, dependencies);

      $scope.editTask = {
      assignedTo: assignedTo,
      dependencies: dependencies,
      dueDate: dueDate,
      isCompleted: false,
      location: location,
      task: task,
      urgency: urgency
      };

      console.log($scope.editTask);
      let itemId = $routeParams.itemId;
      console.log(itemId);
      ItemStorage.putOneItem(itemId, $scope.editTask)
        .then(function() {
        $location.url("/items/list");
    });
  };
//I can't get the itemid into this function
  // ItemStorage.getOneItem ()
  //   .then( (objToEdit) => {
  //     console.log("inside ItemEditCtrl.getOneItem ", objToEdit);
  //   });

});
