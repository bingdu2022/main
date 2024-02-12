
(function () {
  'use strict';
  angular.module('myApp', [])  // angular.modeul takes 2 args to CREATE a module. If the secodng arg ', []' is omitted, the angular.module('myApp') retrieves or uses the previously created module.

    //Register a controller

    // Controller's Responsibilities
    // -- Set up initial state of $scope
    // -- Add behavior to the $scope. 
    // -- Do not do bussiness rules, instead, send events to Models and answer states of the events of 
    // -- Do not share code or state across controllers
    // What if we need to share variables among multi controllers - use custom services
    .controller('DIController', DIController)   //no ending ; because we have the below filter attribute (.filter(..);)

    //register a custom filter. processFilterFunc can be any name. However, when the registered 'process' is used in a controller, must add Filter to the end of the registered i.e. processFilter
    .filter('process', processFilterFunc)  //register a custom filter. processFilterFunc can be any name and is used in this js file. However, when the registered 'process' is used in a controller, must add Filter to the end of the registered i.e. processFilter
    .filter('multiParams', multiParamsFilter)  //must regiester here but no need inject it to the below controller since it's used inside HTML by the name of multiParams.
    // Summary: 1. create a filter function: processFilterFunc(), which is a  custom filter function and needs to return another function
    //          2. regester it as 'process'
    //          3. use it by the name of 'processFilter', which is not preceded with $. As comparison, '$scope' etc. is AngularJS built-in object/function.
    //          4. map the value of the processFilter() to the html (index.cshtml) of the js file (index.cshtml.js)



    // Register multi controllers in the same model 'myApp':
    .controller("ParentController", ParentController)  //more controllers under the same module
    .controller("ChildController", ChildController)
    .controller("Parent2Controller", Parent2Controller)  //more controllers under the same module
    .controller("Child2Controller", Child2Controller)

    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)

    // Register custom services
    .service("ShoppingListService", ShoppingListService)
    // .service('CustomService', CustomService)
    // -- 1. 'CustomService': use this name to inject it into other services, controllers, etc.
    // -- 2. CustomService: treated as a Function Constructor
    // Use SingleTon Design Pattern - equivenent to a shared function
    // -- 1. restricts object to always having a single instance
    // --    Each dependent component gets a reference to  the same instance 
    // --    Multiple controllers injected with a Service will all have access to the same service instance
    // Lazily Instantiated - 
    // -- 1. only created if an application component declares it as a dependency
    // -- 2. it'll never get created if no commponents in your app are dependent on it

    // Register custom services
    .service('ShoppingList2Service', ShoppingList2Service)

    //Register custom service factory function
    .factory('ShoppingList2Factory', ShoppingList2Factory)
    //'ShoppingList2Factory' is what's injected and the latter is actual factory function name.
    // Two styles:
    // ... 1. var factory = {...}; return factory; // using object literal approach
    // ... 2. var factory = function () {...}; return factory; // using function approach
    // .factory() can produce any type of object or function, including a service but not limited to
    // .service() is just a more limited factory or one shared function not being changeble.

    //The below will use the above ShoppingList2Service
    .controller("ShoppingList1Controller", ShoppingList1Controller)
    .controller("ShoppingList2Controller", ShoppingList2Controller)

    //Register ShoppingList3Controller for service provider
    .controller("ShoppingList3Controller", ShoppingList3Controller)
    //Register service provider of ShoppingList3Controller
    .provider('ShoppingList3Service', ShoppingList3ServiceProvider)
    .config(Config)


    ; // end of Registers of an app module


  DIController.$inject = ['$scope', '$filter', 'processFilter', '$timeout'];  //for doing minification, which removes all unnecessary characters like space etc to reduce the size of the code
  function DIController($scope, $filter, processFilter, $timeout) {       //function DIController(){..}; as the last element for doing minification
    //var vm = this;
    $scope.name = "Yak";

    $scope.upper = function () {          
      var upCase = $filter('uppercase');  // uppercase filter in js
      $scope.name = upCase($scope.name);
    };

    $scope.cookieCost = 25.03;            //$iflter in HTML

    $scope.detail = function () {
      return "Yak likes to eat healthy food!";
    };

    $scope.imageName = "people.png";
    $scope.logoOrPeople = function () {
      if ($scope.imageName == "logo.jpg") {
        $scope.imageName = "people.png"
      } else { $scope.imageName = "logo.jpg" };
    };

    //Use a custom filter inside js. Note that $scope.detail() is a function()
    $scope.fromCustomFilter = processFilter($scope.detail());  // fromCustomFilter is used in the js UI: index.cshtml

    //Use ng-click 
    $scope.counts = 0;
    $scope.countOnePerClick = function () {
      $scope.counts += 1;
    };

    //To understand Degist Cycle: loop over ng bounded items first time when one item changes and then loop over them second time in case the change from first time impacts other bounded items
    //Not recommend but can use $watch function to save old and new values of an attribute, i.e. Attribute counter as defined below inside a controller:
    //Not recommend it is because there already have ...
    $scope.counter = 0;
    $scope.counterFunc = function () {
      return $scope.counter ++;
    };
    $scope.$watch('counter', function (newValue, oldValue) {
      console.log("old value: ", oldValue);
      console.log("new value: ", newValue);
    });

    //recommended way of using @watch to understand Digest Cycle: 
    //when a click happens, js internally loops through other clicks (BD: or related?) to see if they're impacted by or changes due to the change of the click.
    $scope.$watch( function () {
      console.log("Digest loop fired!");
      // after loading index.cshtml, 9="Digest loop fired!" = the number of the functions executed during loading index.cshtml
      //ng-clicking logoOrPeople: 4="Digest loop fired!" = its related 
    });
    //Example, when click Counter in HTML, Digest loop fired = 3 because of 3 = $scope.$watch fires 1 + {{counter}} fires 1 + ng-click="counterFunc()" fires 1

    //$digest: be paired with setTimeout() function to do waiting and updating $scope.counter2 outside the function or {{counter2}} in HTML
    //it can't catch/report errors inside setTimeout(...) 
    $scope.counter2 = 0;
    $scope.counterSetTimeOut = function () {
      setTimeout(function () {  // this is not ng related function, so the below $scope.counter2++ will not reflect in HTML unless we use $digest or $apply
        $scope.counter2++;
        console.log("Counter2 incremented after a moment waiting!"); //it fires after waiting
        $scope.$digest(); //it manually triggers updating $scope.counter2 or {{counter2}} in HTML after waiting
      }, 2000);  //2000 mini seconds
    };

    //$apply: be paired with setTimeout() function to do waiting and updating $scope.counter2 outside the function or {{counter2}} in HTML
    //it can catch/report errors inside setTimeout(...) 
    $scope.counter3 = 0;
    $scope.counterSetTimeOut3 = function () {
      setTimeout(function () {
        //the below $apply can catch/report errors if they occur inside $apply(function(){...})
        //it also triggers $digest to update $scope.counter3 or {{counter3}} in HTML after waiting
        $scope.$apply(function () { //it pairs with setTimeout to do wait and update $scope.counter3 or {{counter3}} in HTML after waiting
          $scope.counter3++;
          console.log("Counter3 incremented after a moment waiting!"); //it fires after waiting
        });
      }, 2000);  //2000 mini seconds
    };

    //Use angularJS native $timeout function, which = setTimeout(.) + $digest or $apply
    $scope.counter4 = 0;
    $scope.counterSetTimeOut4 = function () {
      $timeout(function () {
          $scope.counter4++;
      }, 2000);  //2000 mini seconds
    };

    //two ways binding: ng-model="2waybinding"
    $scope.way2bindingJS = "default"

    $scope.test1Way1Time="default"
    $scope.test1Way1TimeFunc = function () {
      $scope.test1Way1Time = "1 way 1 time change part: " + $scope.way2bindingJS

      //one way binding: can change whenever ng-model=test1Way1Time in HTML changes and clicking test1Way1TimeFunc
      $scope.oneWayBindingJS = "1wayBinding + " + $scope.test1Way1Time
      //one time binding: can only update its initial value (or change only once) no matter how ng-model=test1Way1Time in HTML changes and clicking test1Way1TimeFunc
      $scope.oneTimeBindingJS = "1timeBinding + " + $scope.test1Way1Time

    };

    //ng-repeat and index
    var items1 = ["i1", "i2"];
    var items2 = [
      { name: "n1", quantity: 2 },
      { name: "n2", quantity: 1 }

    ];
    $scope.list1 = items1;
    $scope.list2 = items2;

    //ng-model and button to let users add new object to the object list
    $scope.addToList = function () {
      var newItem = { name: $scope.newItemName, quantity: $scope.newItemQuantity };
      $scope.list2.push(newItem);
    };

    //filter: create a native js filter
    var numberArray = [1, 2, 3, 4, 5];
    var numberArrayFilter = numberArray.filter(function (value) {  // create a new array from an array
      return value > 3;
    });
    console.log("filtered: ", numberArrayFilter);

    function above5(value) { return value > 3; }  //the last ; of a function can be omitted.
    console.log("filtered: ", numberArray.filter(above5) ); //note not above5() as usually we do
    //filter string
    var stringArray = ["a", "b", "abc"];
    var searchString ="b"
    function containsMeInValue(value) { return value.indexOf(searchString) !== -1; };
    console.log("filtered string array:",stringArray.filter( containsMeInValue));
    // = filtered string array: Array["b", "abc"]

    //inheritance: prototypal inheritance
    var parent = {
      value: "parentValue",
      obj: {
        objValue: "parentObjValue"
      },
      walk: function () {
        console.log("walking!");
      }
    };
    var child = Object.create(parent); //Object.create(...) is supported by many broswers - a standard method
    console.log("Child - child.value: ", child.value);
    console.log("Child - child.obj.objValue: ", child.obj.objValue);
    console.log("Parent - parent.value: ", parent.value);
    console.log("Parent - parent.obj.objValue: ", parent.obj.objValue);
    console.log("Parent: ", parent);
    console.log("Child: ", child);

    child.value = "childValue";  //it does not change parent.value
    child.obj.objValue = "childObjValue"; //it changes parent.obj.parentObjValue
    console.log("Changed Child - child.value: ", child.value);
    console.log("Changed Child - child.obj.objValue: ", child.obj.objValue);
    console.log("Parent - parent.value: ", parent.value);
    console.log("Parent - parent.obj.objValue: ", parent.obj.objValue);
    console.log("child.obj === parent.obj ? ", child.obj === parent.obj); //= True
    console.log("child.value === parent.value ? ", child.value === parent.value); //= False

    //Use function constructor
    function Dog(name) {   // the function first letter is upcase which reminds us that it's a function constructor and not a regular function
      this.name = name;
      console.log("'this' is: ", this);
    }
    var myDog = new Dog("Max"); //it goes into function Dog(..) and then 'this' of function Dog(..) = Dog(..)
    console.log("myDog: ", myDog);

    ////Dog Not being used as a function constructor, i.e. Dog("Max2"):
    ////it'll cause 'TypeError: Cannot set properties of undefined (setting 'name')'
    ////Reason: 'this' inside function Dog() is not defined when using Dog("Max2") directly or without using constructor
    //Dog("Max2"); 

    //Scope Inheritance
    //inside or inner ng-controller auto-inherits outter ng-controller
    //For primative type of scope values, changing inner value doesn't change outter value
    //For reference type of scope values, changing inner value changes outter value

  }; //DIController end

  function processFilterFunc() {  //create a custom filter outside of DIController
    return function (input) {
      input = input || "";  //if input is nothing, then input = "".
      input = input.replace("likes", "loves");
      return input;  //return processed input
    };
  };

  //this custom filter is used in HTML, so no need to inject to DIController
  //Also, no need to sufix the registered name with Filter when used in HTML.
  function multiParamsFilter() {  //create a custom filter outside of DIController
    return function (input, target, replace) {
      input = input || "";  //if input is nothing, then input = "".
      input = input.replace(target, replace);
      return input;  //return processed input
    };
  };

  ParentController.$inject = ['$scope'];
  function ParentController($scope) {  //it's called by <div ng-controller="ParentController"> in index.cshtml
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;
  };

  ChildController.$inject = ['$scope'];
  function ChildController($scope) {  //it's called by <div ng-controller="ChildController"> in index.cshtml
    console.log("$scope.parentValue: ", $scope.parentValue);
    console.log("Child $scope: ", $scope);

    $scope.parentValue = 5; //it doesn't change ParentController.$scope.parentValue
    console.log("*** Changed: $scope.parentValue = 5: ");
    console.log("$scope.paranetValue: ", $scope.parentValue);
    console.log("$scope.$parent.paranetValue (directly check parent scope): ", $scope.$parent.parentValue);
    console.log($scope); //can view parentController under [[Prototype]] or  __proto__ of the ChildController's $scope

    console.log("*** before: $scope.pc.parentValue = ",$scope.pc.parentValue);
    $scope.pc.parentValue = 6; //it changes $scope.pc.parentValue of both ParentController and ChildController
    console.log("*** after: $scope.pc.parentValue = ", $scope.pc.parentValue);
    console.log($scope);

  };

  function Parent2Controller() {  //why not $scope here because we directly use the instance of the function as in  var parent = this
    var parent = this;
    parent.value = 1;
  }
  Child2Controller.$inject = ['$scope']; //no need $scope here but just to view $scope
  function Child2Controller($scope) {
    var child = this;
    child.value = 5;
    console.log("Child2Controller $scope: ", $scope);
  }

  //2 related controllers use one service which holds properties/functions to be used by different controllers 
  ShoppingListAddController.$inject = ["ShoppingListService"];
  function ShoppingListAddController(ShoppingListService) {
    var vm = this;
    vm.itemName = "";
    vm.itemQuantity = "";
    vm.addItem = function () {
      ShoppingListService.addItem(vm.itemName, vm.itemQuantity);
    };
  }

  ShoppingListShowController.$inject = ['ShoppingListService'];
  function ShoppingListShowController(ShoppingListService) {
    var vm = this;
    vm.items = ShoppingListService.getItems();
    vm.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };
  }
  //Service - a global function
  //So, a service can hold properties/functions to be used by different controllers 
  function ShoppingListService() {
    var vm = this;

    //List of shopping items
    var items = [];

    vm.addItem = function (itemName, quantity) {
      var item = { name: itemName, quantity: quantity };
      items.push(item);
    };

    vm.getItems = function () { return items; };

    vm.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1); //splice: remove 1 item starting from itemIndex position
    }
  };

  //Custom services with .factory()
  //note .service() is also a factory but a much more limited.
  function ShoppingList2Service(maxItems) {
    var vm = this;

    //List of shopping items
    var items = [];

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
  function ShoppingList2Factory() {
    var factory = function (maxItems) {  // define a function
      return new ShoppingList2Service(maxItems);  // always gets a new instance
    };
    return factory;  // points to a function with a pass-in argument and the function contains a new instance of a service 
  }

  //Use service factory - by ShoppingList1Controller
  ShoppingList1Controller.$inject = ["ShoppingList2Factory"];
  function ShoppingList1Controller(ShoppingList2Factory) {
    var vm = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingList2Factory();  //points to the factory function which is an instance of ShoppingList2Service without argument

    vm.items = shoppingList.getItems();

    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      shoppingList.addItem(vm.itemName, vm.itemQuantity);
    };

    vm.removeItem = function (itemIndex) { shoppingList.removeItem(itemIndex); };

  }

  //Use service factory - by ShoppingList2Controller
  ShoppingList2Controller.$inject = ["ShoppingList2Factory"];
  function ShoppingList2Controller(ShoppingList2Factory) {
    var vm = this;

    // Use factory to create new shopping list service and pass in an argument
    var shoppingList = ShoppingList2Factory(3);     //points to the factory function which is an instance of ShoppingList2Service with an argument

    vm.items = shoppingList.getItems();

    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      //try {.;} catch (error) {.};
      try {
        shoppingList.addItem(vm.itemName, vm.itemQuantity);
      } catch (error) { vm.errorMessage = error.message; };  // the error will be thrown by the new ShoppingList2Service(maxItems);
    };

    vm.removeItem = function (itemIndex) { shoppingList.removeItem(itemIndex); };

  }

  //Provider function (can be pair with Config) to customize a Service
  // .provider('name',nameProvider); //name is injected and matters and nameProvider doesn't matter
  // it has:
  //...1. .config = {..};
  //...2. .$get = function() {...; return service; };
  //Register .provider(..) and .config(Config); 
  //Config is guaranteed to run before any services, factorie, or controllers are created.
  //Config has default, don't have to do config
  // .provider() - most verbose, but most flexible
  // ...Config is created at app bootstrapping
  // ...       can't inject it with regular components (?because it just configures some initial attributes)
  // ...       CAN inject the provider of service with nameProvider

  //Use service provider - by ShoppingList3Controller
  ShoppingList3Controller.$inject = ["ShoppingList3Service"];
  function ShoppingList3Controller(ShoppingList3Service) {
    var vm = this;

    // Use factory to create new shopping list service
    vm.items = ShoppingList3Service.getItems();

    vm.itemName = "";
    vm.itemQuantity = "";

    vm.addItem = function () {
      //try {.;} catch (error) {.};
      try {
        ShoppingList3Service.addItem(vm.itemName, vm.itemQuantity);
      } catch (error) { vm.errorMessage = error.message; };
    };

    vm.removeItem = function (itemIndex) { ShoppingList3Service.removeItem(itemIndex); };

  }

  //Below is to dynamically change the defaults of ShoppingList3ServiceProvider
  Config.$inject = ['ShoppingList3ServiceProvider'];  // pay attention: registered 'ShoppingList3Service' + Provider = ShoppingList3ServiceProvider or it's not the function name ShoppingList3ServiceProvider
  function Config(ShoppingList3ServiceProvider) {
    ShoppingList3ServiceProvider.detaults.maxItems = 2;
  }
  //Define service provider function working together with Config for ShoppingList3Controller:
  function ShoppingList3ServiceProvider() {
    var vm = this;

    vm.detaults = { maxItems: 5 };

    vm.$get = function () {
      //The below is to use the same service that's used for .factory() for ShoppingList2Controller
      var shoppingList = new ShoppingList2Service(vm.detaults.maxItems);
      return shoppingList;
    };
  }

  //ng-if, ng-show and ng-hide



})();   //the last () is to invoke (function(){...}) 

//(function () {
//  'use strict';
//  angular.module('myApp', [])
//    .controller('DIController',
//      function () {
//        $scope.name = "Yak";
//        $scope.upper = function () {
//          Var upCase = $filter('uppercase');
//          $scope.name = upCase($scope.name);
//        };
//      });
//})();


//function DIController($scope) {
//  $scope.name = ["abcd@gmail.com", "abcd@yahoo.co.in"];

//  $scope.add = function () {
//    $scope.name.push($scope.newcontact);
//    $scope.newcontact = "";
//  };
//}
//DIController.$inject = ['$scope'];
//angular.module('myApp', []).controller('DIController', DIController);

//(function () {
//  'use strict';
//  angular.module('myApp', [])
//    .controller('DIController',
//      function ($scope, $filter) {
//        $scope.name = "Yak";
//        $scope.upper = function () {
//          //Var upCase = $filter('uppercase');
//          $scope.name = $filter('uppercase')($scope.name);
//        };
//      });
//})();