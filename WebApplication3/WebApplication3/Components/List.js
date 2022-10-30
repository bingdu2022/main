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
//      prop1: '<',
//      prop2: '@',
//      onAction: '&'
//    }
//  })

(function () {
  'use strict';
  angular.module('myApp2', [])
    .component('listComponent', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/Components/List.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListComponentController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'  //reference function > callback to the parent controller
      }
    });

  function ListComponentController() {
    var $ctrl = this;
    $ctrl.title ="Title(no cookie) from listComponent-ListComponentController"

    $ctrl.cookiesInList = function () {
      for (var i = 0; i < $ctrl.items.length; i++) {   //items is bound to the items of ShoppingList3Directive()
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        };
      };
      return false;
    };

    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of SinglePage_AngularJS.cshtml
    };


  };


})();   //the last () is to invoke (function(){...}) 
