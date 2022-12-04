
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

    //Asynchronous Behavior with Promises and $q
    .controller('ShoppingListController', ShoppingListController)   //no ending ; because we have the below filter attribute (.filter(..);) etc.
    .service("ShoppingListService", ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService)

    //$http - API calls
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiBasePath',"https://...")  //if needed, we can create a constant to be used in multi places

    //Directive - extends HTML with dynamic attributes and elements
    //Directive - in a simple word, replace duplicated codes or lines in HTML with template (or even just meaningful words) or templateUrl that's defined by .directive(...) in js
    //it runs only once, so it can be called as initialization of a web app?
    //Register first: .directive('myTag',MyTag)  //'myTag': normalized name that will appear in HTML. MyTab: factory function - returns DDO: Directive Definition Object
    //Then create a function: MyTag.$inject=[..] function myTag(..){var ddo = {..}; return ddo;}
    //Use it in HTML: use tag: <my-tag></my-tag>  // Note not myTag but have to be my-tag which will look for the registered .directive('myTag'...) in js which then looks for MyTag function.
    .directive('listItemDesc', ListItemDesc)
    .directive('inputItem', InputItem)

    //Directive - another property: restrict
    //In var ddo = {..}, if no restrict: '..', it defaults to restrict: 'AE' where A-attribute and E-element 

    // .directive(..) Attribute Isolate = or @ 
    .directive('shoppingList', ShoppingList)
    // Register controller and service for testing .directive(..)
    .controller('ShoppingList2Controller', ShoppingList2Controller) 
    .service('ShoppingList2Service', ShoppingList2Service)

    // .directive(..) - contoller inside of it
    .directive('shoppingList3', ShoppingList3Directive)

    // .directive(..) - link: LinkFunction
    .directive('shoppingList4', ShoppingList4Directive)

    // .directive(..) - transclude
    .directive('shoppingList5', ShoppingList5Directive)
    // Register controller and service for testing .directive(..) transclude
    .controller('ShoppingList5Controller', ShoppingList5Controller)
    .service('ShoppingList5Service', ShoppingList5Service)

    ; // end of Registers of an app module

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var vm = this;

    vm.items = ShoppingListService.getItems();
    vm.itemName = "";
    vm.itemQuantity = "";
    var originalTitle = "Shopping List 3";
    vm.title = originalTitle + " (" + vm.items.length + " items)";

    vm.addItem = function () {
      ShoppingListService.addItem(vm.itemName, vm.itemQuantity); //After doing .addItem, it seems doing ShoppingListService.getItems() here can't get updated vm.items
      var currentItems = ShoppingListService.getItems().length + 1; //+1: because ShoppingListService.addItem mimics 'deferred' or is a promise, here is slow one step
      vm.title = originalTitle + " (" + currentItems + " items)";  // it's first used by the DDO of the 'Shopping List 3'
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

  // controllers to process results of $http calls
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
      var promise2 = MenuCategoriesService.getMenuForCategory(Id);
      promise2.then(function (response) {
        console.log(response.data);
        vm.category = response.data;
      })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
  //Do $http API calls of /api/Shopping
  MenuCategoriesService.$inject = ['$http','ApiBasePath']  //ApiBasePath shows a way to use a constant though it is not used in the function 
  function MenuCategoriesService($http, ApiBasePath) {
    var vm = this;
    //Call (server root path)/api/Shopping = something like https://localhost:44374/api/Shopping
    vm.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: ("/api/Shopping") //(or "https://localhost:44374/api/Shopping") Note 1: () can be removed if just a string. Note 2: ../api/... generates a result of List: [{id:x, name:y, quantity:z}, {...}] from ShoppingController API
      });
      return response;  //response is a promise response, so the caller will use promise.then(...) to handle its result.
    }

    //Get one item of ShoppingList by Shopping.id over an API call
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

  //DDO: Directive - extends HTML with dynamic attributes and elements
  function ListItemDesc() {
    var ddo = {
      // how angularJS knows item of the below: item is defined in ng-repeat of HTML that is inside the scope of the ng-controller of HTML 
      template: '{{item.quantity}} boxes of {{item.name}}' //{{ ...}} of HTML occurs multi times, so define it here to use it in multi places of HTML
    };
    return ddo;
  }

  //Directive of 'inputItem'
  function InputItem() {
    var ddo = {
      //restrict example:
      restrict: "AE",  // this line can be omitted since it's by default
      //Best practice: use 'A' for attribute when directive has no content and only extends the behavior for the host element
      //               use 'E' for element when directive has content along with possible behavior    

      //because the below is a 'BIG' string with " etc special symbols, so we use templateURL:
      templateUrl: '/Scripts_Custom/AdvancedAngularJS_InputItem.html'  //note can't use /Views/Home/ because customized staff is not allowed to save under it due to security reasons
    };
    return ddo;
  }

  //DDO: .directive(..) Attribute Isolate = or @
  //Bidiractional binding = is such that directive scope property change affects the bound property and visa versa
  //DOM attribute value binding @ always results in directive property being a string
  function ShoppingList() {
    var ddo = {
      templateUrl: '/Scripts_Custom/AdvancedAngularJS_InputItemWithIsolate.html'  //note can't use /Views/Home/ because customized staff is not allowed to save under it due to security reasons
      , scope: {ctrl: '=myCtrl', title: '@title', title2: '@title2'}  //DOM attribute value binding @ always results in directive property being a string
    };
    return ddo;
  }

  // for Directive
  function ShoppingList2Service() {
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
  // for Directive
  ShoppingList2Controller.$inject = ["ShoppingList2Service"];
  function ShoppingList2Controller(ShoppingList2Service) {
    var vm = this;

    vm.items = ShoppingList2Service.getItems();
    vm.title = "Shopping List 5(Limited to 3 items)";

    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      //try {.;} catch (error) {.};
      try {
        ShoppingList2Service.addItem(vm.itemName, vm.itemQuantity);
      } catch (error) { vm.errorMessage = error.message; };
    };

    vm.removeItem = function (itemIndex) {
      ShoppingList2Service.removeItem(itemIndex);
      vm.errorMessage = ""; //in case Remove occurs after Error: Max items (3) reached!
    };

  }

  //How the below works:
  //...1. In angularJS, under Module, register .directive('shoppingList3', ShoppingList3Directive)
  //...2. In HTML (AdvancedAngularJS.cshtml), write <shopping-list3 items="ctrl3.items" ..., where assign ctrl3.items to the items inside shopping-list3
  //...3. Copy the original HTML content of the shopping-list3 position into an HTML file (AdvancedAngularJS_InputItem_controller.html)
  //...4. Inside AdvancedAngularJS_InputItem_controller.html, check errors by ng-if="ctrl.cookiesInList()"
  //...5. In angularJS, create DDO with the url of shopping-list3 content over templateUrl and defining a controller which will handle errors
  //...6. In angularJS, Create the DDO's controller of handling errors
  //Directive with its own controllers
  //Create a DDO with a controller inside it
  function ShoppingList3Directive() {  //which is registered as .directive('shoppingList3',...)
    var ddo = {
      templateUrl: '/Scripts_Custom/AdvancedAngularJS_InputItem_controller.html',
      scope: {
        items: '<', // '<': one way binding (save resources or run faster) - inside-directive changes won't affect outside items (but not objects which are address-reference type)
        title: '@'  // for passing in a string
      },

      controller: ShoppingList3DirectiveController,  //this is to declare/register a controller just like doing it under module.
      controllerAs: 'ctrl',  //ctrl will be used (ie. ctrl.items or ctrl.title etc) in AdvancedAngularJS_InputItem_controller.html 
      //we can define ShoppingList3DirectiveController under module and reference it here by changinge the above two lines into one:
      //controller: 'ShoppingList3DirectiveController as ctrl';
      //the ShoppingList3DirectiveController under module can be used not only for the directive but for other places as well if needed.

      bindToController: true //bind scope{.params.} to ctrl
    };
    return ddo;
  };
  //define the controller of the DDO or ShoppingList3Directive
  function ShoppingList3DirectiveController() {
    var vm = this;

    vm.cookiesInList = function () {
      for (var i = 0; i < vm.items.length; i++) {   //items is bound to the items of ShoppingList3Directive()
        var name = vm.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          vm.errorMessage = "Warning: cookies detected!";
          return true;
        };
      };
      vm.errorMessage = "";
      return false;
    }

    vm.removeItem = function (itemIndex) {
      vm.items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
      vm.errorMessage = ""; //in case Remove occurs after Error: Max items (3) reached!
    }

  };
 
  //DDO: Directive APIs and '&' (video: 7:50-7:55)
  //The goal is to let the parent controller (ShoppingList2Controller) remove an item of a list which is displayed in a directive by passing remove method as delegate
  //... didn't practice coding here.


  //DOM manipulation is usually done inside of the link function over DDO
  //DDO: Declare link function inside .directive: var ddo={ scope:{..}, link: LinkFunction, ..templateUrl: '..' }; return ddo; }
  //The purpose of using 'link' here is to display/remove a warning message in a different way
  function ShoppingList4Directive() {  //which is registered as .directive('shoppingList4',...)
    var ddo = {
      templateUrl: '/Scripts_Custom/AdvancedAngularJS_InputItem_link.html',
      scope: {
        items: '<', // '<': one way binding (save resources or run faster) - inside-directive changes won't affect outside items (but not objects which are address-reference type)
        title: '@'  // for a passing-in string
      },

      controller: ShoppingList3DirectiveController,  //this is to declare/register a controller just like doing it under module.
      controllerAs: 'ctrl',  //ctrl will be used (ie. ctrl.items or ctrl.title etc) in AdvancedAngularJS_InputItem_controller.html 
      //we can define ShoppingList3DirectiveController under module and reference it here by changinge the above two lines into one:
      //controller: 'ShoppingList3DirectiveController as ctrl';
      //the ShoppingList3DirectiveController under module can be used not only for the directive but for other places as well if needed.

      bindToController: true, //bind scope{.params.} to ctrl

      link: ShoppingList4DirectiveLink  //It's a function which uses event listener scope.$watch to monitor the result of ctrl.cookiesInList()
      // and then show or remove warning cookie based on the result true/false.
    };
    return ddo;
  };
  //below is to serve ShoppingList4Directive
  function ShoppingList4DirectiveLink(scope,element,attrs,controller) {
    // scope = $scope but why not use $scope is because here scope is pass-in parameter and not $inject parameter. 
    console.log("link scope is: ", scope);  // = $scope or $$.. $parent . $root . ctrl: ShoppingList3DirectiveController .. [[Prototype:]] Object
    console.log("Controller instance is: ", controller); // = ShoppingList3DirectiveController
    console.log("Element is: ", element);  // = jQuery.fn.init(1): shopping-list4
    scope.$watch('ctrl.cookiesInList()', function (newValue, oldValue) {
      console.log("newValue: ", newValue);
      console.log("oldValue", oldValue);
      if (newValue === true) {
        displayCookieWarning();
      }
      else {
        removeCookieWarning();
      }

    });

    function displayCookieWarning() {
      ////Use angular jqLite
      //var warningElem = element.find("div"); // element = shopping-list4 > AdvancedAngularJS_InputItem_link.html which has one div
      //warningElem.css('display', 'block');
      ////Except for .find and .css, there are lots of other methods of jqLite
      ////the methods can be found over console.log("Element is: ", element)

      //the above shows errors instantly and the below shows errors slowlly

      //If jQuery included before Angular
      var warningElem2 = element.find("div.error3");
      warningElem2.slideDown(1900) //900 mini seconds

    }

    function removeCookieWarning() {
      ////Use Angular jqLite
      //var warningElem = element.find("div"); // element = shopping-list4 > AdvancedAngularJS_InputItem_link.html which has one div
      //warningElem.css('display', 'none');

      //the above shows errors instantly and the below shows errors slowlly

      //If jQuery included before Angular
      var warningElem2 = element.find("div.error3");
      warningElem2.slideUp(1900) //500 mini seconds


    }

  }


  //DDO: transclude: let error messages stay in the main HTML and have DDO to control its display or hiding
  //The goal is use different error messages in different places of HTML but these messages use the same DDO to control their show/hide etc behaviors.

  //How it works: (in short: the main HTML holds the error messages; DDO processes error, find their messages of the main HTML and show/hide the messages.)
  //...1. In angularJS, under Module, register .directive('shoppingList5', ShoppingList5Directive)
  //...2. In the main HTML (AdvancedAngularJS.cshtml), write <shopping-list5 items="ctrl5.items" ..., where assign ctrl5.items to the items of shopping-list5 or shoppingList5
  //...3. Copy the original HTML content (displying a list and checking errors etc.) of the shopping-list5's position into a helper HTML file (AdvancedAngularJS_InputItem_transclude.html)
  //...4. Inside AdvancedAngularJS_InputItem_transclude.html, set up <div class="error2" ng-transclude></div>
  //...5. In angularJS, create DDO with the url of shopping-list5 content over templateUrl and defining a controller which will handle errors
  //...6. In angularJS, Create the DDO's controller of handling errors

  //<div ng-transclude><div> - insert evaluated wrapped content into element marked with ng-transclude 
  function ShoppingList5Directive() {  //which is registered as .directive('ShoppingList5',...)
    var ddo = {
      templateUrl: '/Scripts_Custom/AdvancedAngularJS_InputItem_transclude.html',
      scope: {
        items: '<', // '<': one way binding (save resources or run faster) - inside-directive changes won't affect outside items (but not objects which are address-reference type)
        title: '@'  // for a passing-in string
      },

      controller: ShoppingList3DirectiveController,  //this is to declare/register a controller just like doing it under module.
      controllerAs: 'ctrl',  //ctrl will be used (ie. ctrl.items or ctrl.title etc) in AdvancedAngularJS_InputItem_controller.html 
      //we can define ShoppingList3DirectiveController under module and reference it here by changinge the above two lines into one:
      //controller: 'ShoppingList3DirectiveController as ctrl';
      //the ShoppingList3DirectiveController under module can be used not only for the directive but for other places as well if needed.

      bindToController: true, //bind scope{.params.} to ctrl
      link: ShoppingList5DirectiveLink,
      transclude: true 
    };
    return ddo;
  };
  //below is to serve ShoppingList5Directive
  function ShoppingList5DirectiveLink(scope, element, attrs, controller) {
    // scope = $scope but why not use $scope is because here scope is pass-in parameter and not $inject parameter. 
    console.log("link scope is: ", scope);  // = $scope or $$.. $parent . $root . ctrl: ShoppingList3DirectiveController .. [[Prototype:]] Object
    console.log("Controller instance is: ", controller); // = ShoppingList3DirectiveController
    console.log("Element is: ", element);  // = jQuery.fn.init(1): shopping-list4
    scope.$watch('ctrl.cookiesInList()', function (newValue, oldValue) {
      console.log("newValue: ", newValue);
      console.log("oldValue", oldValue);
      if (newValue === true) {
        displayCookieWarning();
      }
      else {
        removeCookieWarning();
      }

    });

    scope.$watch('ctrl.errorMessage', function (newValue, oldValue) {
      console.log("newValue: ", newValue);
      console.log("oldValue", oldValue);

    });

    function displayCookieWarning() {
      ////Use angular jqLite
      //var warningElem = element.find("div"); // element = shopping-list4 > AdvancedAngularJS_InputItem_transclude.html which has one div
      //warningElem.css('display', 'block');
      ////Except for .find and .css, there are lots of other methods of jqLite
      ////the methods can be found over console.log("Element is: ", element)

      //the above shows errors instantly and the below shows errors slowlly

      //If jQuery included before Angular
      var warningElem2 = element.find("div.error2");
      warningElem2.slideDown(1900) //900 mini seconds

    }

    function removeCookieWarning() {
      ////Use Angular jqLite
      //var warningElem = element.find("div"); // element = shopping-list4 > AdvancedAngularJS_InputItem_link.html which has one div
      //warningElem.css('display', 'none');

      //the above shows errors instantly and the below shows errors slowlly

      //If jQuery included before Angular
      var warningElem2 = element.find("div.error2");
      warningElem2.slideUp(1900) //500 mini seconds

    }

  }
  // for Directive
  function ShoppingList5Service() {
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

    // The below is never used because ng-click='ctrl.removeItem()' is in AdvancedAngularJS_InputItem_transclude.html 
    //   which has its own conotrller ShoppingList3DirectiveController
    vm.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
    }
  };
  // for Directive
  ShoppingList5Controller.$inject = ["ShoppingList5Service"];
  function ShoppingList5Controller(ShoppingList5Service) {
    var vm = this;

    vm.items = ShoppingList5Service.getItems();
    vm.title = "Transclude_ShoppingList (horror and cookie)";
    vm.warning = "Warning from ShoppingList5Controller: Cookie detected!";

    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      //try {.;} catch (error) {.};
      try {
        ShoppingList5Service.addItem(vm.itemName, vm.itemQuantity);
      } catch (error) { vm.errorMessage = error.message; };
    };

    // The below removeItem is never used because ng-click='ctrl.removeItem()' is in AdvancedAngularJS_InputItem_transclude.html
    //   which has its own conotrller ShoppingList3DirectiveController
    vm.removeItem = function (itemIndex) {
      ShoppingList5Service.removeItem(itemIndex);
      vm.errorMessage = ""; //in case Remove occurs after Error: Max items (3) reached!
    };

  }




})();   //the last () is to invoke (function(){...}) 
