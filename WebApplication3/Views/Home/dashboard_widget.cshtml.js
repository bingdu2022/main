// view1.controller.js

angular.module('myApp').controller('View1Controller', function ($scope) {
  $scope.showExplorerWidget = false;
  $scope.viewTitle = "Title of View 1";

  $scope.openAllDashboards = function () {
    // Implement logic to open View 2 and dim the top bar and bottom area
  };

  $scope.openView3 = function () {
    $scope.showExplorerWidget = false;
    // Implement logic to load and display View 3
  };
});
