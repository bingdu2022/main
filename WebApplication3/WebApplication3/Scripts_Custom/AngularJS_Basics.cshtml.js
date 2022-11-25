// Coding trend: high cohesion and loose coupling

// This js does
// ...1. inserts / renders List.html into AngularJS_Basics.cshtml.
// ..... ListComponentController's $ctrl.$doCheck() acts like an event listener of #1
// ...2. inserts/renders ListEvent.html into AngularJS_Basics.cshtml by mimicing server calls with promise response.
// ..... SpinnerController acts like an event listener of #2 and uses $rootScope.$on(.) to listen a message caused by users' operations and shows/hides the spinner occordingly
// ..... SpinnerController can be called as a common helper or tool of the AngularJS_Basics.cshtml.js 
//                         because its member $rootScope is a global variable and can work with all other components of the entire myApp.
//                         That's why it's even created in its own module (angular.module('Spinner',[])) in ShoppingModuleComponentsAngularJS.cshtml
//                However, it seems we just need one module and the module has a tree of components.

// ..... Use deferred=$q.defer() (has deferred.resolve(result) or deferred.reject(result) , result can be a simple message or json) to create a Promise.
//          A Promise is a function that returns a single value or error in the future.
//          So whenever you have some asynchronous process that should return a value or an error, you can use $q.defer() to create a new Promise.
//          In most cases, angular $http call return a promise or no need use $q.defer() anymore. If $http call returns success but one success property is bad and we want to set it as reject, we can use $q.defer().
//          Example:
//              // create a new instance of deferred
//              var deferred = $q.defer();
//              // send a post request to the server
//              $http.post('/user/login',
//                { username: username, password: password })
//                // handle success
//                .success(function (data, status) {           // here is the $http promise
//                  if (status === 200 && data.status) {
//                    user = true;
//                    deferred.resolve();
//                  } else {
//                    user = false;
//                    deferred.reject();                       // here we use deferred.reject() to turn a success $http promise to a reject $http promise
//                  }
//                })
//                // handle error
//                .error(function (data) {
//                  user = false;
//                  deferred.reject();
//                });

// ..... $timeout(function() {.do things.}, mini seconds): wait or give mini seconds for the js to do '.do things'
// ..... check 2 promises in paralell: $q.all([namePromise, quantityPromise]).then(function (response) {.come here if all succeed.}).catch(function (response) {.come here if one fails.}).finally(function () {.});
// ..... $ctrl.$onInit = function () {.}
// ..... items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position in items[.,..]
// ..... $rootScope.$broadcast('.', {.}); listened by $rootScope.$on('.', handlerName);

//   You don’t need defer to create a simple-valued promise:
// ..... var defer = $q.defer();
// ..... $http.get('options.json').success(function (result) {defer.resolve(result)});
// ..... return defer.promise;
//   The right method is:  
// ..... return $http.get('options.json').then(function (response) {return response.data});
//   You don’t need defer to change the value of a promise:
// ..... var defer;
// ..... defer = $q.defer();
// ..... defer.resolve(['detail', 'simple']);
// ..... return defer.promise;
//   The right method is:
// ..... return $q.when(['detail', 'simple']);
//   $timeout returns a promise:
// ..... return $timeout(function() {}, 5000);

// ..... AngularJS Deferred & Promises- Basic Understanding: (including callbacks, $.ajax(.) and $http.get(.) or $http(.))
// ..... https://www.tothenew.com/blog/angularjs-deferred-promises-basic-understanding/
//       Since $http is an abstraction over $q, it has different callbacks. Instead of .then and .catch, 
//       it’s .success and .error and the arguments you get are different.



// This js is a (function(){...})();, which contains several (instead of one) .components for the purpose of comparisons and learning
// .. it consists of 
//....On the client side or front-end:
// ...1. SinglePage_MainController. It renders <div id="listComponentArea"..>
// ...2. listComponent with List.html and its ListComponentController. It renders <list-component...> which is part of <div id="listComponentArea"..>
// ...3. ShoppingListController. It renders <div id="listEventArea"..>
//....Invovled on the server side or front-end and back-end:
// ...4. listEvent (.component) with ListEvent.html and its ListEventController. It renders <list-event..> which is part of <div id="listEventArea"..>.
// ...5. loadingSpinner (.component) with spinner.html and its SpinnerController. It displays a spinner to show ...in processing.... The spinner places a spinner at the <loading-spinner></loading-spinner> of the cshtml.

//main coding component architecture:
//..1. Components - only control their own View and Data - in other word: isolate scope
//..2. Components have well-defined public API - Inputs and Outputs
//.....Inputs: use '<' and '@' bindings only
//.....Never change property of passed-in object or array
//.....Outputs: use '&' for component event callbacks
//.....Pass data to callback through param map {key:val}
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
//      prop1: '<',   //one-way or pass-in prop1, which is assigned in <list-component ... prop1="..."}
//      prop2: '@x',    // it means prop2 is at the address of x which is assigned in <list-component ... x={{...}}
//      onAction: '&'  //reference function: callback to the function of its parent controller after getting/passing-in the parameter of the parent controller, assigned in <list-component ...on-action="...".
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
    //..In short, .component(..) itself sets up links between ctrl (SinglePage_MainController of the js used to render the cshtml) and List.html/ListComponentController.
    //Based on the .component(..) setup of the js and the <list-component...> setup of the AngularJS_Basics.cshtml,
    //..1. The js inserts List.html into the <list-component...> area of the AngularJS_Basics.cshtml when the web page is loaded  when the web page is loaded.
    //..2. The js replaces List.html:{{$ctrl.myTitle}} with ctrl.title which is passed in from SinglePage_MainController.title of the main AngularJS_Basics.cshtml in the binding help of myTitle:'@title'
    //..3. Clicking on Add Item button adds a list (over ng-repeat="item in $ctrl.items") of items which is passed in (one-way) from SinglePage_MainController.items.
    //..4. Clicking on Remove button calls ListComponentController.removeItem() which calls SinglePage_MainController.removeItem(index) (over "$ctrl.removeItem($index);") in the binding help of onRemove.
    //..5. Clicking on Add Item button or Remove button calls ListComponentController.cookiesInList() (due to ng-if="$ctrl.cookiesInList() is coded behind them) and then do the below.
    //.... If cookie is found, displays/hides 'DOM-control: Warning: Cookie Detected!' of <div class="error_inList"..>
    //..6. At the same time, clicking on Add Item button or Remove button triggers ListComponentController.$doCheck() which calls ListComponentController.cookiesInList to monitors if or not the key cookie entered or removed and then do the below.
    //.... If cookie is found, displays/hides 'CSS-ListComponentController-control Warning: Cookie Detected!' of <div class="error_inList2"..>
    .component('listComponent', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/Components/List.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListComponentController,  //not required or an empty function is auto-provided, and always defaults to an alias of '$ctrl'
      // the below things of bindings belong to ListComponentController
      bindings: {  //below parameters and onActions are bound to ListComponentController (defauled a label of '$ctrl') and bound to templateUrl
        items: '<',  //one-way or pass-in: ListComponentController uses items which is passed in from <list-component..items=.>
        myTitle: '@title',  // it's {{$ctrl.myTitle}} of List.html (but it's no where in ListComponentController) and means myTitle is at the address of title which is assigned in <list-component ... title={{xxx}}, and is used by {{$ctrl.myTitle}} of List.html
        onRemove: '&'  //reference function (with func parameters ? ):  callback to the function of its parent controller 
                       //after getting/passing-in the parameter of the parent controller over <list-component ..on-remove="ctrl.removeItem(index)".. .
                       //and it's used by ng-click="$ctrl.removeItem($index) of List.html, and "$ctrl.removeItem($index)" then calls ListComponentController.removeItem().
      }
    })

    ////////////////////////listComponent register end


    ////////////////////////listEvent register start

    //Asynchronous Behavior with Promises and $q
    .controller('ShoppingListController', ShoppingListController)  
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)

    .component('listEvent', {  // mapped to <list-event ...> of AngularJS_Basics.cshtml.
      templateUrl: '/Components/ListEvent.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: ListEventController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
      bindings: {  //below parameters and onActions belong to ListEventController (defaulted to a label of '$ctrl') and are bound to templateUrl
        items: '<',  
        myTitle: '@title',  // ListEventController's myTitle is mapped to the address of title which is assigned in <list-component ... title={{xxx}}
        onRemove: '&'  // reference function:  callback to the function of its parent controller after getting/passing-in the parameter of the parent controller.
      }
    })

    ////////////////////////listEvent register end

    ////////////////////////loadingSpinner register start

    .component('loadingSpinner', {  // mapped to <loading-spinner></loading-spinner> of AngularJS_Basics.cshtml.
      templateUrl: '/Components/spinner.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: SpinnerController,  // Use '$ctrl' as alias
   })

    ////////////////////////loadingSpinner register end


    ; // end of Registers of an app module

  ////////////////////////listComponent start

  //is part of .component('listComponent',{..})
  ListComponentController.$inject=['$element']  //no need $inject $scope which is already there in AngularJS2.0
  function ListComponentController($element) {
    var $ctrl = this;  // need to use $ctrl because it's defined in .component('listComponent', ...)

    //We don't want use the below in our main AngularJS_Basics.cshtml. Instead, we use $ctrl.myTitle which is mapped to the title of <list-event ... title="{{ctrl.title}}" of AngularJS_Basics.cshtml.
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
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of AngularJS_Basics.cshtml
    };

    //other useful methods

    var totalItems = 0;  // it works like VB shared variable whose value stays for the app session.
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
      if (totalItems !== $ctrl.items.length) {  // totalItems is initialized as 0 in $ctrl.$onInit()
        totalItems = $ctrl.items.length;  // reset or keep updating totalItems after using it.      
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

  ////////////////////////loadingSpinner (or SpinnerController) start

  // SpinnerController acts like an event listener of ListEvent and uses $rootScope.$on(.) to listen a message caused by users' operations and shows/hides the spinner occordingly

  //for testing spinner
  //is part of .component('loadingSpinner',{..})
  SpinnerController.$inject = ['$rootScope']  //no need $inject $scope which is already there in AngularJS2.0
  function SpinnerController($rootScope) {
    var $ctrl = this;

    var cancelListener = $rootScope.$on('listEvent:processing', function (event, data) {
      console.log('event is: ', event);  // know the event so that we can use its attributes though they're not used right now here.
      console.log('data is: ', data);  // data is {.} passed-in from $rootScope.$broadcast/$emit('.',{.})

      if (data.on) {
        $ctrl.showSpinner = true;
      }
      else {
        $ctrl.showSpinner = false;
      }
    })

    // As comparison, $scope.$on will be auto-deregitered after the view or method of using it is closed.
    // But here, Must deregister $rootScope.$on(.) after using it so that we won't have memory leak  
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

    //how the below works:
    //..1. users click Remove button of List.html to do ng-click="$ctrl.removeItem($index) where the $ctrl is ListComponentController
    //..2. cursor comes to the below $ctrl.onRemove({ index: itemIndex }) because the bindings: ... onRemove
    //..3. the below $ctrl.removeItem is just used to determine index = itemIndex
    //..4. after #3 gets index = itemIndex, webpage does SinglePage_MainController: SinglePage_MainService.removeItem(itemIndex) > SinglePage_MainService():items.splice(itemIndex, 1)
    $ctrl.removeItem = function (itemIndex) {
      $ctrl.onRemove({ index: itemIndex });   //index comes from the index of on-remove="ctrl.removeItem(index)" of AngularJS_Basics.cshtml
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
        var promises = [];  // Use array [] when there are more than one promises
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
        message: ""   // Set a empty string message as default value of the result of the check function and it's the correct result when the promise call is successful
      };

      //below $timeout mimics async behavior or as an estimated time of doing the promise call
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
