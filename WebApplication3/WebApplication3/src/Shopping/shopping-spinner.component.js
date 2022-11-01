//main coding architecture:
//One module (or more independent or dependent modules)

//One module with many components:

//..1. Components - only control their own View and Data - in other word: isolate scope
//..2. Components have well-defined public API - Inputs and Outputs
//.....Inputs: use '<' and '@' bindings only
//.....Never change property of passed-in object or array
//.....Outputs: use '&' for component event callbacks
//.....Pass data to callback throught param map {key:val}
//.....2-way data binding is minimized as much as possible
//..3. Compoments have well-defined lifecycle
//.....$onInit - controller initialization code
//.....$onChanges(changeObj) - called whenever one-way bindings are updated
//.....   changeObj.currentValue, changeObj.previousValue
//.....$postLink - similar to 'link' in directive
//.....$onDestroy - when scope is about to be destroyed or unloaded from memory
//..4. Application is a tree of components
//Coding structure example:
//angular.module('myApp', [])
//  .component('myComponent', {  //1. myComponent will match <my-component ...prop1="val.." prop2="@.." on-action="parentFunction(myArg)"> ... </my-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
//    templateUrl: 'template.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.prop1}} ...
//    controller: CompController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
//    bingdings: {
//      prop1: '<',   //one-way or pass-in prop1
//      prop2: '@x',    // it means prop2 is at the address of x which is assigned in <list-component ... x={{...}}
//      onAction: '&'  //reference function: callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
//    }
//  })

//How to share data between components:
//Publishing an Event: 1. $scope.$emit - up scope chain; 2. $scope.$broadcast - down scope chain
//html (ng-app) (top of the $scope chain) $broadcast event('greet',{msg:'Hi'}) to the $scope chains of all its Components (including children and grand children ...) 
//A component $emit event('greet',{msg:'Hi'}) to the $scope chains of all its parent/grandParent components and up to html (ng-app)
//One component can $scope.$on('greet', handlerFunction) to subscribe the event('greet'..). The $on can also be called as listener which can handle the event messages
//if Component A has no path to Component B which $emit an event('x'..), Component A can get the 'x' over $rootScope.$broadcast
//Coding example: $scope.$broadcast('namespace:eventName', {prop: value})
//                $scope.$on('namespace:eventName',handler); 
//                function handler(event, data){if (data.prop === 'val1'){...}} 

(function () {
  'use strict';
  angular.module('myApp') //, ['Spinner'])  //define an independent module: 'myApp' which is used in the MVC main web page: _Layout.cshtml

    ////////////////////////shoppingSpinner register start
    //Asynchronous Behavior with Promises and $q
    .controller('ShoppingListController', ShoppingListController)  
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)  //which has Asynchronous Behavior with Promises and $q

    .component('shoppingSpinner', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/shopping/shopping-spinner.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
    })
    ////////////////////////shoppingSpinner register end

    ; // end of Registers of an app module


  //for testing spinner
  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var vm = this;

    vm.items = ShoppingListService.getItems();
    vm.itemName = "";
    vm.itemQuantity = "";
    var originalTitle = "List Event";
    vm.title = originalTitle + " (" + vm.items.length + " items)";

    vm.addItem = function () {

      //The reason to comment out the below is to be able to test .catch(..) in ShoppingSpinnerController.$ctrl.$doCheck

      //ShoppingListService.addItem(vm.itemName, vm.itemQuantity); //After doing .addItem, it seems doing ShoppingListService.getItems() here can't get updated vm.items
      //var currentItems = ShoppingListService.getItems().length + 1; //+1: because ShoppingListService.addItem mimics 'deferred' or is a promise, here is slow one step
      //vm.title = originalTitle + " (" + currentItems + " items)";

      var item = {
        name: vm.itemName,
        quantity: vm.itemQuantity
      };
      vm.items.push(item);

      vm.title = originalTitle + " (" + vm.items.length + " items)";

    };

    vm.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
      vm.items = ShoppingListService.getItems();
      vm.title = originalTitle + " (" + vm.items.length + " items)";
    };

  }; //ShoppingListController end

  ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
  function ShoppingListService($q, WeightLossFilterService) {
    var vm = this;
    // List of shopping items
    var items = [];

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
          result.message = "deferred.reject(result): Stay away from cookies, Bing";
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

  ////////////////////////ShoppingSpinnerController start


})();   //the last () is to invoke (function(){...}) 
