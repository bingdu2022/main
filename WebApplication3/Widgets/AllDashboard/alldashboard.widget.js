// allDashboard.widget.js

angular.module('myApp').directive('allDashboardWidget', function () {
  return {
    restrict: 'E',
    templateUrl: '/Widgets/AllDashboard/alldashboard.widget.html',
    controller: 'allDashboardWidgetController',
    transclude: true,
  };
});

//angular.module('myApp', []).component('allDashboardWidget', {
//  templateUrl: '/Widgets/AllDashboard/alldashboard.widget.html',
//  controller: 'allDashboardWidgetController',
//  //bindings: {
//  //  onDashboardSelected: '&'
//  //},
//  transclude: true
//});

//Decision Factors:
//Complexity: If your dashboard functionality involves complex behavior and interactions, a directive might be more appropriate.
//  Reusability: If you're building a reusable, self-contained component that follows the component-based architecture, the component approach is preferable.
//DOM Manipulation: If you need fine - grained control over DOM manipulation, a directive might be more suitable.


angular.module('myApp').controller('allDashboardWidgetController', function ($scope) {
  $scope.dashboardOptions = [
    { icon: 'Icon for ezview', objectName: 'ezview', isSelected: false },
    { icon: 'Icon for explorer', objectName: 'explorer', isSelected: false }
    // Add more dashboard options as needed
  ];

  $scope.mouseOnDashboard = function (dashboard) {
   // Change the color of the selected row
       dashboard.isSelected = true;
  };

  $scope.mouseOffDashboard = function () {
    // Reset the color of all rows to default
    angular.forEach($scope.dashboardOptions, function (option) {
      option.isSelected = false;
    });

    //$scope.dashboardOptions.forEach(option => option.isSelected = false);   // native js syntax
  };

//Placing the below selectDashboard in the Parent Component or Controller:
//Pros:
//Encourages a more modular and reusable approach, especially if the logic is common across multiple components or directives.
//Provides a clear separation of concerns where the child directive focuses on UI - related interactions, and the parent handles higher - level application logic.
//Cons:
//The parent component needs to be aware of the specific behavior of its child components, which can introduce some level of coupling.
//May require more careful communication between the parent and child components.
  $scope.selectDashboard = function (dashboard) {
    // Handle the logic when clicking the row
    $scope.openSelectedDashboard(dashboard);
  };




  // the below works but does not need it here. Note to the below, need ng-mouseleave="handleMouseLeave($event)" in allsahboard.widget.html

  //$scope.handleMouseLeave = function (event) {
  //  // Get the mouse position
  //  var mouseY = event.clientY;

  //  // Get the grid element
  //  var gridElement = document.querySelector('.dashboard-grid');

  //  // Get the bottom position of the grid
  //  var gridBottom = gridElement.getBoundingClientRect().bottom;

  //  // Check if the mouse is below the grid
  //  if (mouseY > gridBottom) {
  //    $scope.deselectDashboard();
  //  }
  //};

});

