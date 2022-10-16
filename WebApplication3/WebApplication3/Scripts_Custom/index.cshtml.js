
(function () {
  'use strict';
  angular.module('myApp', [])
    .controller('DIController', DIController)   //no ending ; because we have the below filter attribute (.filter(..);)
    .filter('process', processFilterFunc)  //register a custom filter. processFilterFunc can be any name. However, when the registered 'process' is used in a controller, must add Filter to the end of the registered i.e. processFilter
    .filter('multiParams', multiParamsFilter) ; //must regiester here but no need inject it to the below controller since it's used inside HTML.

  DIController.$inject = ['$scope', '$filter', 'processFilter', '$timeout'];  //for doing minification
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
    $scope.fromCustomFilter = processFilter($scope.detail());

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
      setTimeout(function () {
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
    var numberArrayFilter = numberArray.filter(function (value) {
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

    //inheritance:
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
    function Dog(name) {
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