// Angular Module: 'myApp'
// shoppingList with ListComponentController and the url of shopping-list.html

(function () {
  'use strict';
  angular.module('myApp')  //note it's not .('myApp',[]).
    // .module('myApp') means a part of .module('myApp',[]) which exits somewhere

    //shoppingList register start

    // shoppingList component: defines bindings between shopping-list.html/ListComponentController and its parent ShoppingModuleComponentsAngularJS.cshtml/ShoppingModuleComponentsAngularJS.cshtml.js
    // how does the below .component(...) work: 
    //..1. inserts shopping-list.html into the main ShoppingModuleComponentsAngularJS.cshtml. 
    //..2. (shopping-list) displays myTitle which is passed in from SinglePage_MainController.title of the main ShoppingModuleComponentsAngularJS.cshtml.js in the binding help of myTitle:'@title'
    //..3. (shopping-list) displays users' input one item (name,quantiry) to a shopping-list (over ng-repeat="item in $ctrl.items") of items which is part of ShoppingModuleComponentsAngularJS.cshtml
    //..4. (shopping-list) calls ShoppingModuleComponentsAngularJS.cshtml.removeItem(index) (over "$ctrl.removeItem($index);") in the binding help of onRemove
    //..5. (shopping-list) examining if or not the key cookie exists (over ng-if="$ctrl.cookiesInList()) by simply calling ListComponentController.cookiesInList
    .component('shoppingList', {  //1. shoppingList will match <shopping-list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </shopping-list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/shopping/shopping-list.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListComponentController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  //- Binds the items property to a one-way (input) binding. Changes to items in the parent component will be reflected in this component.
        myTitle: '@title',  //  Binds the myTitle property of the templateUrl html as a string. It's a one-way binding where the value of title attribute in the parent component is passed as a string.
        onRemove: '&'  //reference function: callback to the function of its parent controller after getting/passing-in the parameter of the parent controller, assigned in <list-component ...on-action="...".  // Binds the onRemove property to a callback function in the parent component. This allows the child component to call a function in the parent component.

        // component's register (shoppingList) and its bindings MUST be 'instantiated' as in the parent html (ShoppingModuleComponentsAngularJS.cshtml): <list-component items="ctrl.items" title="{{ctrl.title}}" on-remove="ctrl.removeItem(index)"></list-component>
        // Note that 'angularJS naming convension' asks you write title={{ctrl.title}} for myTitle: '@title'. Otherwise, if you define myOwnTitle: '@title', the parent html must have my-own-title = {{ctrl.title}}  

        //  items: '<'
        //         This binding is for the items property.In the ListComponentController, you would expect to see logic related to handling or manipulating the items data.
        //         In the template file('/src/shopping/shopping-list.component.html'), you would expect to see how the items are displayed or utilized in the HTML.
        //  myTitle: '@title'
        //         This binding is for the myTitle property.In the ListComponentController, you would find logic related to handling or using the myTitle value.
        //         In the template file, you would use {{ myTitle }} or similar syntax to display the value in the HTML.
        //    onRemove: '&'
        //         This binding is for the onRemove property, which is a callback function. In the ListComponentController, you would define the actual function that gets executed when the onRemove callback is invoked.
        //         In the template file, you would likely find an element or event that triggers the execution of this callback.

      }
    })

    ; //shoppingList register end

  //ListComponentController of .component('shoppingList',{..})
  ListComponentController.$inject = ['$element']  //no need $inject $scope which is already there in AngularJS2.0
  function ListComponentController($element) {
    var $ctrl = this;

    //We don't want the below occurs in our main ShoppingModuleComponentsAngularJS.cshtml. In other word, the title used in main HTML shouldn't come from this ListComponentController
    //$ctrl.myTitle = "Title(no cookie) from shoppingList-ListComponentController"

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
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of ShoppingModuleComponentsAngularJS.cshtml
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
