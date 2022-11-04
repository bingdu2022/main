(function () {

  ////below works but commented out - search //Multi-Dependencies of the sln. to see reasons
  //angular.module('urApp')  // MUST depends on 'ui.router' and it's defined in src/myApp.module.js

  angular.module('myApp')   // MUST depends on 'ui.router' and it's defined in src/Ui_Router/angular-ui-router-app.module.js
    .config(RoutesConfig); //or call an ui router service
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {  // Must these two providers. Provider will config $state and $urlRouter services
    // Reirect to tab 1 if no other URL matches
     $urlRouterProvider.otherwise('/tab1');  //it means come to /tab1 if users enter an invalid name i.e. /xyz etc.

    // Set up Ui states
    $stateProvider
      .state('tab1', {
        url: '/tab1',
        template: '<div> This is Tab 1 content </div>'
      })

      .state('tab2', {
        url: '/tab2',
        templateUrl: '/src/Ui_Router/html-table.html'
      })
    ;
  }
})();