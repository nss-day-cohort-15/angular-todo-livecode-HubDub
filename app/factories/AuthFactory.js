"use strict";

app.factory("AuthFactory", function() {

  let createUser = function(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        //you can make unique error coding but we've just used some boilerplate here
      });
  };

  let loginUser = function(userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      //you can make unique error coding but we've just used some boilerplate here
    });
  };

  let logoutUser = function() {
    return firebase.auth().signOut();
  };

  let isAuthenticated = function() {
    console.log("isAuthenticated", firebase.auth().currentUser);
    return (firebase.auth().currentUser) ? true : false;
    //? is ternary statement. shortened version of if else. first one is to do if true and second if false. in this case we're just returning true or false based on if they are an authorized user or not. it needs to remain simple.
  };

//let getUserId = function() {
//   let userId = userObj.uid;
//   return userId;
// }

  return {createUser, loginUser, logoutUser, isAuthenticated};
});

