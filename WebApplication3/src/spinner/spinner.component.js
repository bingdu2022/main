
(function () {
  'use strict';
  angular.module('Spinner')  //note it's not .('Spinner',[]).
    // .module('Spinner') means a part of .module('Spinner',[]) which exits somewhere

    ////////////////////////loadingSpinner register start
    .component('loadingSpinner', {  //1. listComponent will match <list-component ...items="val.." myTitle="@.." on-remove="parentFunction(myArg)"> ... </list-component> of the main HTML; 2. {.}: a simple config object and NOT a function.
      templateUrl: '/src/spinner/spinner.component.html', // may have ng-click="$ctrl.onAction({myArg:'val'})", {{$ctrl.items}} ...
      controller: SpinnerController,  //not required. Empty function auto-provided and placed on scope with label '$ctrl'
    })
  ////////////////////////loadingSpinner register end

  ////////////////////////loadingSpinner start
  //for testing spinner
  //is part of .component('loadingSpinner',{..})
  SpinnerController.$inject = ['$rootScope']  //no need $inject $scope which is already there in AngularJS2.0
  function SpinnerController($rootScope) {
    var $ctrl = this;

    var cancelListener = $rootScope.$on('shoppingListSpinner:processing', function (event, data) {
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
    // But, $rootScope.$on is NOT autoderegistered and Must be deregistered after using it so that we won't have memory leak
    $ctrl.$onDestroy = function () {
      cancelListener();
    }
  }
  ////////////////////////loadingSpinner end


})();   //the last () is to invoke (function(){...}) 
