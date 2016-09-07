"use strict";

app.controller("ItemNewCtrl", function ($scope, ItemStorage, $location) {
  $scope.title = "Add a new task";
  $scope.btnText = "Save new task";
  //the above he added to change the item form depending on what controller is using it
  $scope.newTask = {
    assignedTo: "",
    dependencies: "",
    dueData: "",
    isCompleted: false,
    location: "",
    task: "",
    urgency: "normal",
    uid: $scope.$parent.getUser()
  };
    //this is how we access the method to get user in TopCtrl. this is one time ctrls can talk to each other.this sets uid on the object so it will be on all new objects
//now we write the function for interacting with the form and view and pass along to factory. we made up th efunction name postNewItem so we will need to write that next
  $scope.addNewItem = function() {
    console.log("addNewItem is here");
    ItemStorage.postNewItem($scope.newTask)
      .then(function() {
        $location.url("/items/list");
    });
  };
});