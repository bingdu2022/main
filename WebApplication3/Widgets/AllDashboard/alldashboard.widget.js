// allDashboard.widget.js

angular.module('myApp').directive('allDashboardWidget', function () {
  return {
    restrict: 'E',
    templateUrl: '/Widgets/AllDashboard/alldashboard.widget.html',
    transclude: true,
    link: function (scope, element, attrs, ctrl, transclude) {
      transclude(scope, function (clone) {
        element.find('.widget-container').append(clone);
      });
    }
  };
});


//angular.module('myApp', []).component('allDashboardWidget', {
//  templateUrl: '~/Widgets/AllDashboard/alldashboard.widget.html',
//  controller: 'allDashboardWidgetController',
//  bindings: {
//    onDashboardSelected: '&'
//  },
//  transclude: true
//});

// alldashboard.widget.js
angular.module('myApp').controller('allDashboardWidgetController', function ($scope) {
  $scope.dashboardOptions = [
    { icon: 'Icon for ezview', objectName: 'ezview', isSelected: false },
    { icon: 'Icon for explorer', objectName: 'explorer', isSelected: false }
    // Add more dashboard options as needed
  ];
   

  $scope.selectDashboard = function (dashboard) {
    // Reset isSelected for all options
    $scope.dashboardOptions.forEach(option => option.isSelected = false);
    // Set isSelected for the selected option
    dashboard.isSelected = true;

    $scope.selectedDashboard = null;

    // Call the onDashboardSelected function provided by the parent scope
    $scope.onDashboardSelected({ selectedDashboard: dashboard });
  };

  $scope.deselectDashboard = function () {
    // Deselect all options when mouse leaves the grid
    $scope.dashboardOptions.forEach(option => option.isSelected = false);

    // Set selectedDashboard to null
    $scope.selectedDashboard = null;
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
