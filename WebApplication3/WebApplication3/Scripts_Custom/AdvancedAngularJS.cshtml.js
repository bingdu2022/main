
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

(function () {
  'use strict';
  angular.module('myApp', [])

    .controller('ShoppingListController', ShoppingListController)   //no ending ; because we have the below filter attribute (.filter(..);)
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)

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

    vm.addItem = function (name, quantity) {
      var promise = WeightLossFilterService.checkName(name);
      promise.then(function (response) {  //if promise gets no errors
        var nextPromise = WeightLossFilterService.checkQuantity(quantity);
        nextPromise.then(function (result) {
          var item = { name: name, quantity: quantity };
          items.push(item);
        }, function (errorResponse) { console.log(errorResponse.message); }); //if nextPromise fails
      }, function (errorResponse) { //if promise fails
        console.log(errorResponse.message);
      });
    };

    vm.getItems = function () { return items; };

    vm.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
    }

  }

  WeightLossFilterService.$inject = ['$q', '$timeout'];
  function WeightLossFilterService($q, $timeout) {
    var vm = this;

    vm.checkName = function (name) {

      var deferred = $q.defer(); //set up async environment

      var result = {
        message: ""
      };

      //below $timeout mimic async behavior
      $timeout(function () {  //Syntax: $timeout(function() {..}, mini seconds);
        //check for item name
        if (name.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(result);
        }
        else {
          result.message = "Stay away from cookies, Bing";
          deferred.reject(result);
        };
      }, 2000);

      return deferred.promise;  //go back to caller which will see if it's response (deferred.resolve(.)) or reject
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

})();   //the last () is to invoke (function(){...}) 
