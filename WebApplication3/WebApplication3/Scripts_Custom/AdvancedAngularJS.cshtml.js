
(function () {
  'use strict';
  angular.module('myApp', [])


  //Promise API - a part of New NES6 API

  //Asynchronous Behavior with Promises and $q
  //...Difficult to use regular Callbacks tech
  //...Use Promises, which is part of New ES6 API.
  //Promise: object which can be passed around or returned that holds references to the outcome of asynchronous behavior
  //In AngularJS, promises are created through the $q service
  //Structure:
  // function asyncFunction() {
  // var deferred = $q.defer(); //creates async environment with all the hooks into it, including the promise object.
  // if (..) {deferred.resolve(result);} //Marks successful completion, wraps data for the promise.
  // else {deferred.reject(error);}  //Marks unsuccessful completion, wraps data for the promise.
  // return deferred.promise;  // Returns promise to caller (a hook back to this entrie process)
  //}
  // var promise = asyncFunction ();
  // promise.then( function (result) {...}, function (error) {...} ).then (...) ;
  // $q.all ([promise1, promise2]).then( function (result) {...})
  // .catch( function (error){...});


    .controller('ShoppingListController', ShoppingListController)   //no ending ; because we have the below filter attribute (.filter(..);) etc.
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)

    //$http

    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiBasePath',"https://...")  //if needed, we can create a constant to be used in multi places


    ; // end of Registers of an app module

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var vm = this;

    vm.items = ShoppingListService.getItems();
    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      ShoppingListService.addItem(vm.itemName, vm.itemQuantity);
    };

    vm.removeItem = function (itemIndex) { ShoppingListService.removeItem(itemIndex); };

  }; //ShoppingListController end

  ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
  function ShoppingListService($q, WeightLossFilterService) {
    var vm = this;
    // List of shopping items
    var items = [];

    ////below is a working code but not good strcuture 

    //vm.addItem = function (name, quantity) {
    //  var promise = WeightLossFilterService.checkName(name);
    //  promise.then(function (response) {  //if promise gets no errors
    //    var nextPromise = WeightLossFilterService.checkQuantity(quantity);
    //    nextPromise.then(function (result) {
    //      var item = { name: name, quantity: quantity };
    //      items.push(item);
    //    }, function (errorResponse) { console.log(errorResponse.message); }); //if nextPromise fails
    //  }, function (errorResponse) { //if promise fails
    //    console.log(errorResponse.message);
    //  });
    //};

    ////below code is better than the previously commented out

    //vm.addItem = function (name, quantity) {
    //  var promise = WeightLossFilterService.checkName(name);
    //  promise
    //    .then(function (response) { //check the below second item if checkName doesnot hit errors
    //      return WeightLossFilterService.checkQuantity(quantity);
    //    })
    //    .then(function (response) {
    //      var item = { //come here to prepare item to add it to items after both checkName and checkQuantity hit no errors
    //        name: name,
    //        quantity: quantity
    //      };
    //      items.push(item);
    //    })
    //    .catch(function (errorResponse) {
    //      console.log(errorResponse.message);
    //    });
    //}

    //below is the best because waiting time of checkQuantity = checkName time + checkQuantity time in the above coding
    //check 2 items in paralell: total time = the needed longest time of the 2 checkings
    //check quantity doesnot have to wait for a result of checkName in terms of rejected 
    vm.addItem = function (name, quantity) {
      var namePromise = WeightLossFilterService.checkName(name);
      var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

      //check 2 items in paralell
      $q.all([namePromise, quantityPromise])
        .then(function (response) {  //only come here if both namePromise and quantityPromise get deferred.resolved results.
          var item = {
            name: name,
            quantity: quantity
          };
          items.push(item);
        })
        .catch(function (errorResponse) { //come here right away if one of the 2 checking fails
          console.log(errorResponse.message);
        });
    }

    vm.getItems = function () { return items; };

    vm.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
    }

  }

  WeightLossFilterService.$inject = ['$q', '$timeout']; //$timeout - ng function, so you don't have to call $apply or $digest in using js native setTimeOut
  function WeightLossFilterService($q, $timeout) {
    var vm = this;

    vm.checkName = function (name) {

      var deferred = $q.defer(); //set up async environment

      var result = {
        message: ""
      };

      //below $timeout mimics async behavior
      $timeout(function () {  //Syntax: $timeout(function() {..}, mini seconds);
        //check for item name
        if (name.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(result);  //meaning a successful result (in this case, it's {message: ""})
        }
        else {
          result.message = "Stay away from cookies, Bing";
          deferred.reject(result);  //meaning a rejected result (in this case, it's {message: "Stay away from cookies, Bing"})
        };
      }, 2000);

      return deferred.promise;  //go back to caller which will see if it's response - deferred.resolve(.) or deferred.reject(.)
    };

    vm.checkQuantity = function (quantity) {
      var deferred = $q.defer();
      var result = { message: "" };
      $timeout(function () {
        //check for too many boxes
        if (quantity < 5) { deferred.resolve(result); }
        else {
          result.message = "That's too much, Bing!";
          deferred.reject(result);
        };
      }, 1000);

      return deferred.promise;
    };
  }

// Ajax with $http Service
  //Syntax: $http({method: "GET", url: "http://...", params: {param1: "value1"} ... }).then( function success(response){.. // do something with response.data .. }, function error(response){.. //do something with error message ..} );
  //url is required. If no method, default is GET
  //response.data holds the server data response:
  //... if JSON, auto-gets transformed into a JS object
  //module.constant can be used as an injectable constant

  MenuCategoriesController.$inject = ['MenuCategoriesService'];
  function MenuCategoriesController(MenuCategoriesService) {
    var vm = this;
    var promise = MenuCategoriesService.getMenuCategories();  //getMenuCategories() is a $http call, so it gets a promise return
    promise.then(function (response) {
      vm.categories = response.data;   // =List: [{id:x, name:y, quantity:z}, {...}] from ShoppingController API and it's a JSON literal
    })
      .catch(function (response) {
        console.log("Something went wrong!")
      })

    vm.logMenuItem = function (Id) {
      var promise = MenuCategoriesService.getMenuForCategory(Id);
      promise.then(function (response) {
        console.log(response.data);
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
  MenuCategoriesService.$inject = ['$http','ApiBasePath']  //ApiBasePath shows a way to use a constant though it is not used in the function 
  function MenuCategoriesService($http, ApiBasePath) {
    var vm = this;
    vm.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: ("/api/Shopping") //(or "https://localhost:44374/api/Shopping") Note 1: () can be removed if just a string. Note 2: ../api/... generates a result of List: [{id:x, name:y, quantity:z}, {...}] from ShoppingController API
      });
      return response;  //response is a promise response, so the caller will use promise.then(...) to handle its result.
    }

    //Get one item of ShoppingList
    vm.getMenuForCategory = function (Id) {
      var response = $http({ url: "/api/Shopping/" + Id });  //the default is method: "GET"
      ////Above = below
      //var response = $http({
      //  method: "GET",
      //  url: ("/api/Shopping"),
      //  params: {Id: Id}
      //});

      return response;
    }
  }

  //Provide http links of Shopping.id


})();   //the last () is to invoke (function(){...}) 
