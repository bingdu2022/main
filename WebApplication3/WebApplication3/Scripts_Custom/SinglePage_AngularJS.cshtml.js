//main coding architecture:
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
  angular.module('myApp', [])

    ////////////////////////listComponent register start
    .controller('SinglePage_MainController', SinglePage_MainController)
    .service('SinglePage_MainService', SinglePage_MainService)

    //Components: how the below .component(...) works: 
    //..1. inserts List.html into the main SinglePage_AngularJS.cshtml. 
    //..2. (List) does myTitle which is passed in from SinglePage_MainController.title of the main SinglePage_AngularJS.cshtml in the binding help of myTitle:'@title'
    //..3. (List) adds a list (over ng-repeat="item in $ctrl.items") of items which is passed in (one-way) from SinglePage_MainController.items
    //..4. (List) calls SinglePage_MainController.removeItem(index) (over "$ctrl.removeItem($index);") in the binding help of onRemove
    //..5. (List) examining if or not the key cookie exists (over ng-if="$ctrl.cookiesInList()) by simply calling ListComponentController.cookiesInList
    .component('listComponent', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/Components/List.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListComponentController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  //one-way or pass-in
        myTitle: '@title',  // it means myTitle is at the address of title which is assigned in <list-component ... title={{xxx}}
        onRemove: '&'  //reference function (with func parameters ? ):  callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
      }
    })

    ////////////////////////listComponent register end


    ////////////////////////listEvent register start
    //Asynchronous Behavior with Promises and $q
    .controller('ShoppingListController', ShoppingListController)  
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)

    .component('listEvent', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/Components/ListEvent.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListEventController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  //one-way or pass-in
        myTitle: '@title',  // it means myTitle is at the address of title which is assigned in <list-component ... title={{xxx}}
        onRemove: '&'  //reference function (with func parameters ? ):  callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
      }
    })
    ////////////////////////listEvent register end

    ////////////////////////loadingSpinner register start
   .component('loadingSpinner', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/Components/spinner.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: SpinnerController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
    })
    ////////////////////////loadingSpinner register end


    ; // end of Registers of an app module

  ////////////////////////listComponent start

  //is part of .component('listComponent',{..})
  ListComponentController.$inject=['$element']  //no need $inject $scope which is already there in AngularJS2.0
  function ListComponentController($element) {
    var $ctrl = this;

    //We don't want the below occurs in our main SinglePage_AngularJS.cshtml. In other word, the title used in main HTML shouldn't come from this ListComponentController
    //$ctrl.title = "Title(no cookie) from listComponent-ListComponentController"

    $ctrl.cookiesInList = function () {
      for (var i = 0; i < $ctrl.items.length; i++) {   //items is bound to the items of ShoppingList3Directive()
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        };
      };
      return false;
    };

    //how the below works:
    //..1. users click Remove button of List.html to do ng-click="$ctrl.removeItem($index) where the $ctrl is ListComponentController
    //..2. cursor comes to the below $ctrl.onRemove({ index: itemIndex }) because the bindings: ... onRemove
    //..3. the below $ctrl.removeItem is just used to determine index = itemIndex
    //..4. after #3 gets index = itemIndex, webpage does SinglePage_MainController: SinglePage_MainService.removeItem(itemIndex) > SinglePage_MainService():items.splice(itemIndex, 1)
    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of SinglePage_AngularJS.cshtml
    };

    //other useful methods

    var totalItems = 0;
    $ctrl.$onInit = function () {  //will run only once when the controller gets instantiated.
     console.log("we are in $onInit().");
     totalItems = 0;
    }

    $ctrl.$onChanges = function (changeObj) {
      console.log(".$onChange: changeObj is: ", changeObj);
      //After .component('listComponent'..) or ListComponentController is initiated,
      //.$onChange: changeObj is:  {items: SimpleChange, myTitle: SimpleChange}
      //{ items: SimpleChange, myTitle: SimpleChange }
      //items: SimpleChange { previousValue: UNINITIALIZED_VALUE, currentValue: Array(0) }
      //myTitle: SimpleChange { previousValue: UNINITIALIZED_VALUE, currentValue: 'Shopping List - No cookie (0 items)' }

      // After first click 'Add Item',
      //.$onChange: changeObj is: { myTitle: SimpleChange }
      //1.	currentValue: "Shopping List - No cookie (1 items)"
      //2.	previousValue: "Shopping List - No cookie (0 items)"
      //[[Prototype]]: Object

      // After click 'Add Item' the second time,
      // myTitle: SimpleChange { previousValue: 'Shopping List - No cookie (1 items)', currentValue: 'Shopping List - No cookie (2 items)' }

    }

    //below is to display/hide an error message in (DOM) the parent webpage while Site.css helps to hide the DOM error message in loading up the web page. 
    $ctrl.$doCheck = function () {  //it's called everytime $digest runs
      if (totalItems !== $ctrl.items.length) {
        var warningElem = $element.find('div.error_inList2');  //$element.find(.) and .slideDown/Up are jquery's methods
        if ($ctrl.cookiesInList()) {
          warningElem.slideDown(900);
        }
        else {
          warningElem.slideUp(900);
        }
      }
    }

  }

  ////////////////////////////////////////
  //for 'SinglePage_MainService' which is for 'SinglePage_MainController'
  function SinglePage_MainService() {
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
  // for 'SinglePage_MainController'
  SinglePage_MainController.$inject = ["SinglePage_MainService"];
  function SinglePage_MainController(SinglePage_MainService) {
    var vm = this;

    vm.items = SinglePage_MainService.getItems();
    vm.itemName = "";
    vm.itemQuantity = "";
    var originalTitle = "Shopping List - No cookie";
    vm.title = originalTitle + " (" + vm.items.length + " items)";

    vm.addItem = function () {
      SinglePage_MainService.addItem(vm.itemName, vm.itemQuantity);
      var currentItems = SinglePage_MainService.getItems().length; 
      vm.title = originalTitle + " (" + currentItems + " items)";
    };

    vm.removeItem = function (itemIndex) {
      SinglePage_MainService.removeItem(itemIndex);
      vm.title = originalTitle + " (" + vm.items.length + " items)";
    };

  };
  /////////////////////////////////////

  ////////////////////////listComponent end

  ////////////////////////loadingSpinner start
  //for testing spinner
  //is part of .component('loadingSpinner',{..})
  SpinnerController.$inject = ['$rootScope']  //no need $inject $scope which is already there in AngularJS2.0
  function SpinnerController($rootScope) {
    var $ctrl = this;

    var cancelListener = $rootScope.$on('listEvent:processing', function (event, data) {
      console.log('event is: ', event);
      console.log('data is: ', data);

      if (data.on) {
        $ctrl.showSpinner = true;
      }
      else {
        $ctrl.showSpinner = false;
      }
    })

    // As comparison, $scope.$on will be auto-deregitered after the view or method of using it is closed.
    // Must deregister $rootScope.$on(.) after using it so that we won't have memory leak  
    $ctrl.$onDestroy = function () {
      cancelListener();
    }
  }
  ////////////////////////loadingSpinner end

  ////////////////////////ListEventController start

  //is part of .component('listEvent',{..})
  ListEventController.$inject = ['$element','$rootScope','$q','WeightLossFilterService']  //no need $inject $scope which is already there in AngularJS2.0
  function ListEventController($element,$rootScope,$q,WeightLossFilterService) {
    var $ctrl = this;
    var totalItems = 0;

    $ctrl.$onInit = function () {  //will run only once when the controller gets instantiated.
      totalItems = 0;
      console.log("we are in $onInit().");
    }

    //$ctrl.cookiesInList = function () {
    //  for (var i = 0; i < $ctrl.items.length; i++) {   //items is bound to the items of ShoppingList3Directive()
    //    var name = $ctrl.items[i].name;
    //    if (name.toLowerCase().indexOf("cookie") !== -1) {
    //      return true;
    //    };
    //  };
    //  return false;
    //};

    //how the below works:
    //..1. users click Remove button of List.html to do ng-click="$ctrl.removeItem($index) where the $ctrl is ListComponentController
    //..2. cursor comes to the below $ctrl.onRemove({ index: itemIndex }) because the bindings: ... onRemove
    //..3. the below $ctrl.removeItem is just used to determine index = itemIndex
    //..4. after #3 gets index = itemIndex, webpage does SinglePage_MainController: SinglePage_MainService.removeItem(itemIndex) > SinglePage_MainService():items.splice(itemIndex, 1)
    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of SinglePage_AngularJS.cshtml
    };

    //other useful methods

    $ctrl.$onChanges = function (changeObj) {
      console.log(".$onChange: changeObj is: ", changeObj);
      //After .component('listComponent'..) or ListComponentController is initiated,
      //.$onChange: changeObj is:  {items: SimpleChange, myTitle: SimpleChange}
      //{ items: SimpleChange, myTitle: SimpleChange }
      //items: SimpleChange { previousValue: UNINITIALIZED_VALUE, currentValue: Array(0) }
      //myTitle: SimpleChange { previousValue: UNINITIALIZED_VALUE, currentValue: 'Shopping List - No cookie (0 items)' }

      // After first click 'Add Item',
      //.$onChange: changeObj is: { myTitle: SimpleChange }
      //1.	currentValue: "Shopping List - No cookie (1 items)"
      //2.	previousValue: "Shopping List - No cookie (0 items)"
      //[[Prototype]]: Object

      // After click 'Add Item' the second time,
      // myTitle: SimpleChange { previousValue: 'Shopping List - No cookie (1 items)', currentValue: 'Shopping List - No cookie (2 items)' }

    }

    //below is to display/hide an error message in (DOM) the parent webpage while Site.css helps to hide the DOM error message in loading up the web page. 
    $ctrl.$doCheck = function () {  //it's called everytime $digest runs
      if (totalItems !== $ctrl.items.length) {  //if the list of items is changed, it's time to check if cookie is added.
        totalItems = $ctrl.items.length;  //reset

        $rootScope.$broadcast('listEvent:processing', { on: true });
        var promises = [];
        for (var i = 0; i < $ctrl.items.length; i++) {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        //show/hide the error message 
        $q.all(promises)  //check all the promises array
          .then(function (result) {  //it's no error or successful - only come here if both namePromise and quantityPromise get deferred.resolved results.
            // Remove cookie warning
            var warningElem = $element.find('div.error_inList2');  //$element.find(.) and .slideDown/Up are jquery's methods
            warningElem.slideUp(900);
          })
          .catch(function (result) {
            // For some reasons, after clicking 'Add Item' for cookie, it nerver comes here if ShoppingListController.addItem uses ShoppingListService.addItem(.) which uses WeightLossFilterService.checkName(.)
            // Therefore, ShoppingListController.addItem is changed to simply add items by itself without 'deffered' or 'promise call' by asking help of ShoppingListService.addItem(.).
            // After doing this change, promises[] can hit the cookie rejected.result.
            
            // Show cookie warning
            var warningElem = $element.find('div.error_inList2');  //$element.find(.) and .slideDown/Up are jquery's methods
            warningElem.slideDown(900);
          })
          .finally(function () {
            $rootScope.$broadcast('listEvent:processing', { on: false });
          });
      }
    }

  }

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

      //The reason to comment out the below is to be able to test .catch(..) in ListEventController.$ctrl.$doCheck

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

  ////////////////////////ListEventController start




})();   //the last () is to invoke (function(){...}) 
