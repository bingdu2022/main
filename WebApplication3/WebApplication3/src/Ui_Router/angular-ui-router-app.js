(function () {
  //angular.module('urApp', []);  // MUST depends on 'ui.router'
  angular.module('urApp')
    .config(RoutesConfig); //or call an ui router service
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {  // Must these two providers. Provider will config $state and $urlRouter services
    // Reirect to tab 1 if no other URL matches
     $urlRouterProvider.otherwise('/tab1');

    // Set up Ui states
    $stateProvider
      .state('tab1', {
        url: '/tab1',
        template: '<div> This is Tab 1 content </div>'
      })

      .state('tab2', {
        url: '/tab2',
        template: '<div> This is Tab 2 content </div>'
      })
    ;
  }
})();