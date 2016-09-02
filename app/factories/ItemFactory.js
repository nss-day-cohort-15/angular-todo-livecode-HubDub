"use strict";
//now we'll create a factory and we'll use promises as a library in angular, so we have to put it in as a dependency $q. we'll do the same for ajax (or http) calls $http. factory is a collection of function that you will then export.
app.factory("ItemStorage", ($q, $http, FirebaseUrl) => {
  //we'll write a function to fetch the data from internal json file
  let getItemList = () => {
    console.log(FirebaseUrl);
    let items = [];
    return $q((resolve, reject) => { //this is promise
      $http.get(`${FirebaseUrl}/items.json`) //ajax call
        .success((itemObject) => {  //instead of done
          console.log(itemObject);
          Object.keys(itemObject).forEach((key) => {
            itemObject[key].id = key;
            items.push(itemObject[key]);
          });
          resolve(items); //this will send the array to the controller because we're using that filter, so we used the above line to look into the object at the keys and go over each then take the key and put it into the object as an id property on the object then we take the object and put it in the array items.
        })
        .error((error) => {
          reject(error);
        });
    });
  };
  //now we write th function we made up in ItemNewCtrl
  let postNewItem = (newItem) => {
    console.log(newItem);
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/items.json`, JSON.stringify(newItem))
        //this calls firebase to post into our json file. then we have to stringify before we pass it in, still inside the post, the stringify is second argument
      .success( (objFromFirebase) => {
        resolve(objFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let deleteItem = (itemId) => {
    console.log(itemId);
    return $q( (resolve, reject) => {
      $http.delete(`${FirebaseUrl}/items/${itemId}.json`)
        .success( (objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error( (error) => {
          reject(error);
        });
    });
  };
//now we add postNewItem to the return.
  return {getItemList, postNewItem, deleteItem};
});