// dashboard_widget.js

// Controller for the main dashboard widget
angular.module('myApp', []).controller('dashboardWidgetController', function ($scope, $document, $timeout) {
  // Default view title
  $scope.viewTitle = "dashboard_widget";
  // State variables
  $scope.isAllDashboardsOpen = false;
  $scope.overlayAlpha = 0.0;
  $scope.isExplorerWidgetOpen = false;
  $scope.isEzviewWidgetOpen = false;
  // Track the current dashboard selection
  let currentDashboard = "";
  // Flag to control the event listener
  let isListening = false;

  // Event listener for clicks on the document body
  $document.on('click', function (event) {
    if (isListening) {
      // Check if the clicked element is the button that opens the dashboard
      const isDashboardButton = angular.element(event.target).hasClass('dashboard-open-button');

      if (!isDashboardButton) {
        // Check if the clicked element is outside the dashboard grid
        const isOutsideDashboardGrid = !angular.element(event.target).closest('.dashboard-grid').length;

        // If outside the alldashboard grid, close the alldashboard
        if (isOutsideDashboardGrid && $scope.isAllDashboardsOpen) {
          // Apply changes safely using $timeout
          $timeout(function () {
            $scope.closeAlldashboards();
            if (currentDashboard) {
              $scope.openSelectedDashboard(currentDashboard);
            }
          });
        }
      }
    }
  });

  // Function to close the alldashboards
  $scope.closeAlldashboards = function () {
    $scope.isAllDashboardsOpen = false;
    $scope.viewTitle = "dashboard_widget";
    $scope.overlayAlpha = 0;
    isListening = false;
  };

  // Function to open all dashboards
  $scope.openAllDashboards = function () {
    isListening = true;

    // Reset state variables
    $scope.isAllDashboardsOpen = false;
    $scope.isEzviewWidgetOpen = false;
    $scope.isExplorerWidgetOpen = false;

    // Set the view title
    $scope.viewTitle = "alldashboard.widget.html - Select a dashboard";
    // Toggle the alldashboard visibility
    $scope.isAllDashboardsOpen = !$scope.isAllDashboardsOpen;

    // Show the overlay
    $scope.overlayAlpha = $scope.isAllDashboardsOpen ? 0.5 : 0;
  };

  // Function to open a selected dashboard
  $scope.openSelectedDashboard = function (selectedDashboard) {
    // Track the current dashboard selection
    currentDashboard = selectedDashboard;

    // Reset state variables
    $scope.isAllDashboardsOpen = false;
    $scope.isEzviewWidgetOpen = false;
    $scope.isExplorerWidgetOpen = false;
    isListening = false;

    // Handle the selection logic
    $scope.overlayAlpha = 0;
    if (selectedDashboard.objectName === 'explorer') {
      $scope.isExplorerWidgetOpen = true;
      $scope.viewTitle = "explorer.widget.html";
    } else if (selectedDashboard.objectName === 'ezview') {
      $scope.isEzviewWidgetOpen = true;
      $scope.viewTitle = "Ezview.Widget.html";
    }
  };
});
