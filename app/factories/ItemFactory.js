"use strict";
//now we'll create a factory and we'll use promises as a library in angular, so we have to put it in as a dependency $q. we'll do the same for ajax (or http) calls $http. factory is a collection of function that you will then export.
app.factory("ItemStorage", ($q, $http, FirebaseUrl) => {
  //we'll write a function to fetch the data from internal json file
  let getItemList = (user) => {
    // console.log("in getItemList", user);
    // console.log(FirebaseUrl);
    let items = [];
    return $q((resolve, reject) => { //this is promise
      $http.get(`${FirebaseUrl}items.json?orderBy="uid"&equalTo="${user}"`)
      //ajax call. later we added the order by uid and = user to sort and recall only user objects.
        .success((itemObject) => {  //instead of done
          // console.log(itemObject);
          //this will make it not return an error when the databases is empty
          if (itemObject !== null) {
            Object.keys(itemObject).forEach((key) => {
              itemObject[key].id = key;
              items.push(itemObject[key]);
            });
            resolve(items);
          } else {
          resolve(items); //this will send the array to the controller because we're using that filter, so we used the above line to look into the object at the keys and go over each then take the key and put it into the object as an id property on the object then we take the object and put it in the array items.
          }
        })
        .error((error) => {
          reject(error);
        });
    });
  };
  //now we write th function we made up in ItemNewCtrl
  let postNewItem = (newItem) => {
    //newItem.uid = AuthFactory.getUserId();
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

  let getOneItem = (itemId) => {
    console.log("I'm in getOneItem ", itemId);
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/items/${itemId}.json`)
        .success( (objToEdit) => {
          resolve(objToEdit);
        })
        .error( (error) => {
          reject(error);
        });
    });
  };
//he wrote a formula getSingleItem to edit his items. he wrote it the same as above.

  let putOneItem = (itemId, editObject) => {
    console.log("I'm in putOneItem", editObject);
    console.log("putOneItem", itemId);
    // itemId = itemId.replace('-','');
    // console.log("afterreplace", itemId);
    return $q( (resolve, reject) => {
      $http.put(`${FirebaseUrl}/items/${itemId}.json`, JSON.stringify(editObject))
        .success( (FbObject) => {
          resolve(FbObject);
        });
    });
  };
//he did the same as above in a function called updateItem, but he used patch instead of put. patch only replaces what is different instead of replacing the whole object. he did a json.stringify though.
// $http.put(`${FirebaseUrl}/items/${itemId}.json`,
//   JSON.stringify(editObject))
//which you did not do. he also changed the object variable name to objFromFirebase in the success and resolves since it is resolving that object back to the place this function was called.
  return {getItemList, postNewItem, deleteItem, getOneItem, putOneItem};
});