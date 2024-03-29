// dashboard_widget.js

// Controller for the main dashboard widget
angular.module('myApp', []).controller('dashboardWidgetController', function ($scope, $document, $timeout, $http) {
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
      const isDashboardButton = angular.element(event.target).is('button');  //.hasClass('dashboard-open-button');
      var isImage = angular.element(event.target).is('img');

      if (!isDashboardButton && !isImage) {
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

  // Initialize tooltips when the document is ready
  $(document).ready(function () {
    $('.dashboard-open-button').tooltipster({
      content: 'Open a list of dashboards',
    // Other configuration options
    theme: 'tooltipster-default', // Use a default theme
      side: 'top', // Position the tooltip on top of the element
      animation: 'fade', // Use fade animation
    });
  });

  // how to send email by clicking a button: from frontend clicking to backend physically sending an email:
  // 1. frontend: dashboard_widget.cshtml > creae a button with id="sendEmailButton"
  // 2. frontend: dashboard_widget.cshtml.js > get the button and add addEventListener having async call as shown below
  // 3. backend: HomeController.cs >  [HttpPost]
  //                                  public async Task < ActionResult > SendEmail()
  // 4. backend: server.cs > SendGridService.SendEmailAsync3()

  document.getElementById('sendEmailButton').addEventListener('click', async () => {
    try {
      const response = await fetch('/Home/SendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include any data you might need on the server, if necessary
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.info("Successfully sent the email.");
        } else {
          console.error(result.message);
        }

      } else {
        console.error('Error sending email request:', await response.text());
      }
    } catch (error) {
      console.error('Error sending email request:', error.message);
    }
  });

  $scope.sendEmail = function () {
    $http.post('/home/sendEmail')
      .then(function (response) {
        if (response.success) {
          console.log('Successfully sent the email.');
        } else {
          console.log(response.data);
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.error(error.data);
      });
  };

});

angular.module('myApp')
  .directive('dynamicTooltip', function () {
    return {
      priority: 1000, // Adjust the priority as needed
     restrict: 'A',
      scope: {
        tooltipContent: '@',
      },
      link: function (scope, element) {
        // Initialize Tooltipster
        $(element).tooltipster({
          content: scope.tooltipContent || 'Default tooltip content',
          theme: 'tooltipster-default',
          side: 'top',
          animation: 'fade',
        });
      },
    };
  });

