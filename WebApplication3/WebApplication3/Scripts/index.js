////(function () {
////  'use strict';
////  angular.module('app', [])
////    .controller('DIController', DIController);
////  DIController.$inject = ['$scope', '$filter'];
////  function ($scope, $filter) {
////    $scope.name = "Yak";
////    $scope.upper = function () {
////      Var upCase = $filter('uppercase');
////      $scope.name = upCase($scope.name);
////    };
////  };
////}) ();

(function () {
  'use strict';
  angular.module('myApp', [])
    .controller('DIController',
      function () {
        //$scope.name = "Yak";
        //$scope.upper = function () {
        //  Var upCase = $filter('uppercase');
        //  $scope.name = upCase($scope.name);
        //};
      });
})();

//var myApp = angular.module('myApp', [])
//    .controller('DIController',
//      function ($scope) {
//        $scope.name = "Yak";
//        //$scope.upper = function () {
//        //  Var upCase = $filter('uppercase');
//        //  $scope.name = upCase($scope.name);
//        //};
//      });

//function DIController($scope) {
//  $scope.name = ["abcd@gmail.com", "abcd@yahoo.co.in"];

//  $scope.add = function () {
//    $scope.name.push($scope.newcontact);
//    $scope.newcontact = "";
//  };
//}
//DIController.$inject = ['$scope'];
//angular.module('myApp', []).controller('DIController', DIController);