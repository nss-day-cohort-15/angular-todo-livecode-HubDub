"use strict";
//this will take both scope and our item factory as arguments.
// app.controller("ItemEditCtrl", function($scope, ItemStorage, $routeParams, $location) {
  // let itemId = $routeParams.itemid;
  // console.log(itemId);
  // $scope.Items = [];
  // ItemStorage.getItemList()
  //   .then( (itemCollectionArray) => {
  //     console.log("getItemList", itemCollectionArray);
  //     $scope.items = itemCollectionArray;
  //     $scope.selectedItem = $scope.items.filter(function(item) {
  //       return item.id === $routeParams.itemId;
  //     })[0];
  //   });

//   $scope.editOneItem = function(task, dueDate, assignedTo, location, urgency, dependencies) {
//     console.log("inside editOneItem", task, dueDate, assignedTo, location, urgency, dependencies);

//       $scope.editTask = {
//       assignedTo: assignedTo,
//       dependencies: dependencies,
//       dueDate: dueDate,
//       isCompleted: false,
//       location: location,
//       task: task,
//       urgency: urgency,
//       uid: $scope.$parent.getUser()
//       };

//       console.log($scope.editTask);
//       let itemId = $routeParams.itemId;
//       console.log(itemId);
//       ItemStorage.putOneItem(itemId, $scope.editTask)
//         .then(function() {
//         $location.url("/items/list");
//     });
//   };
// });

// for editing a form, he reused the new item form:
app.controller("ItemEditCtrl", function($scope, ItemStorage, $routeParams, $location) {
  $scope.title = "Edit Item";
  $scope.btnText = "Update";
  $scope.newTask = {};

  ItemStorage.getOneItem($routeParams.itemId)
  .then( (response) => {
    $scope.newTask = response;
  });

  $scope.addNewItem = () => {
    ItemStorage.putOneItem($routeParams.itemId, $scope.newTask)
      .then( (response) => {
        $location.url("/items/list");
      });
  };
});
//so he loaded the same partial but based on app routing set a different controller for it. so, in app.js...