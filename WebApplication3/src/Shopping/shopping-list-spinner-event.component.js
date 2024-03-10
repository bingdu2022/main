
(function () {
  'use strict';
  angular.module('myApp') //,['Spinner'])  

    ////////////////////////shoppingListSpinner register start

    .component('shoppingListSpinner', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/shopping/shopping-list-spinner-event.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: shoppingListSpinnerController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  // One-way pass-in reference binding
        myTitle: '@title',  // One-way value binding with a one-time initial value assignment. it means myTitle is at the address of title which is assigned in <list-component ... title={{xxx}}
        onRemove: '&'  //reference function (with func parameters ? ):  callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
      }
    })
    ////////////////////////shoppingListSpinner register end

    ; // end of Registers of an app module


  ////////////////////////shoppingListSpinnerController start

  //is part of .component('shoppingListSpinner',{..})
  shoppingListSpinnerController.$inject = ['$element','$rootScope','$q','WeightLossFilterService']  //no need $inject $scope which is already there in AngularJS2.0
  function shoppingListSpinnerController($element,$rootScope,$q,WeightLossFilterService) {
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
    //..4. after #3 gets index = itemIndex, webpage does ShoppingModuleComponentsAngularJS: SinglePage_MainService.removeItem(itemIndex) > SinglePage_MainService():items.splice(itemIndex, 1)
    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of shopping-simple.component.cshtml
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

        $rootScope.$broadcast('shoppingListSpinner:processing', { on: true });
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
            $rootScope.$broadcast('shoppingListSpinner:processing', { on: false });
          });
      }
    }

  }

  ////////////////////////shoppingListSpinnerController start


})();   //the last () is to invoke (function(){...}) 
