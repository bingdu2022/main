// dashboard_widget.js

angular.module('myApp', []).controller('dashboardWidgetController', function ($scope) {
  $scope.viewTitle = "dashboard_widget"; // Set the default view title
  $scope.isAllDashboardsOpen = false;
  $scope.overlayAlpha = 0.0; // Set the default alpha value

  $scope.openAllDashboards = function () {

    //$scope.style = function () {
    //  return { overlayAlpha: 0.5 } // Set the default alpha value
    //};
    $scope.isAllDashboardsOpen = !$scope.isAllDashboardsOpen;

      // Show the overlay
    $scope.overlayAlpha = ($scope.isAllDashboardsOpen)? 0.5: 0; // Set the default alpha value
};

  // Parent controller or directive
  $scope.onDashboardSelected = function (selectedDashboard) {
    // Handle the selection logic
    $scope.isAllDashboardsOpen = false;
    $scope.overlayAlpha = 0.0;
    if (selectedDashboard.objectName === 'explorer') {
      $scope.openExplorerWidget();
    } else if (selectedDashboard.objectName === 'ezview') {
      $scope.openEzviewWidget();
    };
   

  };

  $scope.isExplorerWidgetOpen = false;
  $scope.openExplorerWidget = function () {
    $scope.isExplorerWidgetOpen = true;
  };

  $scope.isEzviewWdigetOpen = false;
  $scope.openEzviewWidget = function () {
    $scope.isEzviewWdigetOpen = true;
  }

});




//angular.module('myApp', []).component('dashboardWidget', {
//  templateUrl: '~/Widgets/dashboard_widget.html',
//  controller: 'dashboardWidgetController',
//  transclude: true
//});


//angular.module('myApp', []).controller('dashboardWidgetController', function ($scope, $rootScope, $templateRequest) {
//  $scope.viewTitle = "dashboard_widget"; // Set the default view title

//  // Function to open All Dashboards (View 2)
//  $scope.openAllDashboards = function () {

//    // Simulate selecting a dashboard
//    var selectedDashboard = { objectName: 'allDashboard' };

//    // Emit an event to notify other components about the selected dashboard
//    $rootScope.$broadcast('dashboardSelected', selectedDashboard);

//    // Load the template using $templateRequest
//    $templateRequest('/Widgets/AllDashboard/alldashboard.widget.html')
//      .then(function (template) {
//         // Insert the compiled template into the widget-container
//        angular.element(document.querySelector('.widget-container')).html(template);
//      });
//  };

//  $scope.handleDashboardSelection = function (selectedDashboard) {
//    console.log('handleDashboardSelection called', selectedDashboard);
//    // Handle the selection logic
//  };
//});

//angular.module('myApp', []).controller('dashboardWidgetController', function ($scope, $compile, $rootScope, $templateRequest, $sce) {
//  $scope.viewTitle = "dashboard_widget";

//  $scope.openAllDashboards = function () {
//    // Simulate selecting a dashboard
//    var selectedDashboard = { objectName: 'allDashboard' };

//    // Emit an event to notify other components about the selected dashboard
//    $rootScope.$broadcast('dashboardSelected', selectedDashboard);

//    // Load the template using $templateRequest
//    $templateRequest('/Widgets/AllDashboard/alldashboard.widget.html')
//      .then(function (template) {
//        // Insert the template into the DOM
//        angular.element(document.querySelector('.widget-container')).html(template);

//        // Compile the template and link it to the scope
//        var linkFn = $compile(angular.element(document.querySelector('.widget-container')));
//        var compiledTemplate = linkFn($scope);

//        // Insert the compiled template into the widget-container
//        angular.element(document.querySelector('.widget-container')).html(compiledTemplate);
//      });
//  };

//  $scope.handleDashboardSelection = function (selectedDashboard) {
//    console.log('handleDashboardSelection called', selectedDashboard);
//    // Handle the selection logic
//  };
//});
