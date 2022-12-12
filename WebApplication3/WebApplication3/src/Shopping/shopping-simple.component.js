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
  angular.module('myApp')  //Use already defined module: 'myApp' which is first defined in the MVC main web page: _Layout.cshtml

    ////////////////////////ShoppingController register start
    .controller('ShoppingController', ShoppingController)
    .service('ShoppingService', ShoppingService)
    ////////////////////////ShoppingController register end
 
     ////////////////////////shoppingSimple register start
   .component('shoppingSimple', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/shopping/shopping-simple.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
    })
    ////////////////////////shoppingSimple register end


    ; // end of Registers of an app module
   
  ////////////////////////////////////////
  // for 'ShoppingController'
  ShoppingController.$inject = ['ShoppingService'];
  function ShoppingController(ShoppingService) {
    var vm = this;

    vm.items = ShoppingService.getItems();
    vm.itemName = "";
    vm.itemQuantity = "";
    var originalTitle = "Shopping List - No cookie";
    vm.title = originalTitle + " (" + vm.items.length + " items)";

    vm.addItem = function () {
      ShoppingService.addItem(vm.itemName, vm.itemQuantity);
      var currentItems = ShoppingService.getItems().length; 
      vm.title = originalTitle + " (" + currentItems + " items)";
    };

    vm.removeItem = function (itemIndex) {
      ShoppingService.removeItem(itemIndex);
      vm.title = originalTitle + " (" + vm.items.length + " items)";
    };

  };
  //for 'ShoppingService' which is for 'ShoppingController'
  function ShoppingService() {
    var vm = this;

    //List of shopping items
    var items = [];
    var maxItems = 3; //limit to max of 3 items

    vm.addItem = function (itemName, quantity) {
      if (maxItems === undefined || items.length < maxItems) {
        var item = { name: itemName, quantity: quantity };
        items.push(item);
      } else {
        throw new Error("Max items (" + maxItems + ") reached!");
      }
    };

    vm.getItems = function () { return items; };

    vm.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
    }
  };

  /////////////////////////////////////

  ////////////////////////listComponent end

})();   //the last () is to invoke (function(){...}) 
