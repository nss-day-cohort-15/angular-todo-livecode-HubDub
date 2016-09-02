"use strict";
//now we'll create a factory and we'll use promises as a library in angular, so we have to put it in as a dependency $q. we'll do the same for ajax (or http) calls $http. factory is a collection of function that you will then export.
app.factory("ItemStorage", ($q, $http) => {
  //we'll write a function to fetch the data from internal json file
  let getItemList = () => {
    let items = [];
    return $q((resolve, reject) => { //this is promise
      $http.get("../../data/itemList.json") //ajax call
        .success((itemObject) => {  //instead of done
          resolve(itemObject);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

//to make this function available to controllers we have to return it to export it. now we'll go to ItemListCtrl and create it.
  return {getItemList};
});