// Angular Module: 'myApp'
// shoppingList with ListComponentController and the url of shopping-list.html

(function () {
  'use strict';
  angular.module('myApp')  //note it's not .('myApp',[]). 
    // .module('myApp') means a part of .module('myApp',[]) which exits somewhere

    //shoppingList register start

    // shoppingList: defines bindings between shopping-list.html and its parent Module_Components_AngularJS.cshtml
    //Components: how the below .component(...) works: 
    //..1. inserts shopping-list.html into the main Module_Components_AngularJS.cshtml. 
    //..2. (shopping-list) does myTitle which is passed in from SinglePage_MainController.title of the main Module_Components_AngularJS.cshtml in the binding help of myTitle:'@title'
    //..3. (shopping-list) adds users' input one item (name,quantiry) to a shopping-list (over ng-repeat="item in $ctrl.items") of items which is part of Module_Components_AngularJS.cshtml
    //..4. (shopping-list) calls Module_Components_AngularJS.cshtml.removeItem(index) (over "$ctrl.removeItem($index);") in the binding help of onRemove
    //..5. (shopping-list) examining if or not the key cookie exists (over ng-if="$ctrl.cookiesInList()) by simply calling ListComponentController.cookiesInList
    .component('shoppingList', {  //1. shoppingList will match <shopping-list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </shopping-list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/shopping/shopping-list.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListComponentController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  //one-way or pass-in
        myTitle: '@title',  // it means myTitle is at the address of title which is assigned in <shopping-list-component ... title={{xxx}}
        onRemove: '&'  //reference function (with func parameters ? ):  callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
      }
    })

    ; //shoppingList register end

  //ListComponentController of .component('shoppingList',{..})
  ListComponentController.$inject = ['$element']  //no need $inject $scope which is already there in AngularJS2.0
  function ListComponentController($element) {
    var $ctrl = this;

    //We don't want the below occurs in our main Module_Components_AngularJS.cshtml. In other word, the title used in main HTML shouldn't come from this ListComponentController
    //$ctrl.title = "Title(no cookie) from shoppingList-ListComponentController"

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
    //..1. users click Remove button of shopping-list.html to do ng-click="$ctrl.removeItem($index) where the $ctrl is ListComponentController
    //..2. cursor comes to the below $ctrl.onRemove({ index: itemIndex }) because the bindings: ... onRemove
    //..3. the below $ctrl.removeItem is just used to determine index = itemIndex
    //..4. after #3 gets index = itemIndex, webpage does SinglePage_MainController: SinglePage_MainService.removeItem(itemIndex) > SinglePage_MainService():items.splice(itemIndex, 1)
    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of Module_Components_AngularJS.cshtml
    };

    //other useful methods

    var totalItems;
    $ctrl.$onInit = function () {  //will run only once when the controller gets instantiated.
      console.log("we are in $onInit().");
      totalItems = 0;
    }

    $ctrl.$onChanges = function (changeObj) {
      console.log(".$onChange: changeObj is: ", changeObj);
      //After .component('shoppingList'..) or ListComponentController is initiated,
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
      if (totalItems !== $ctrl.items.length ) {
        totalItems = $ctrl.items.length
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


})();   //the last () is to invoke (function(){...}) 
