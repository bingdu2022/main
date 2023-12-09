(function () {

  ////below works but commented out - search //Multi-Dependencies of the sln. to see reasons
  //angular.module('urApp')  // MUST depends on 'ui.router' and it's defined in src/myApp.module.js

  angular.module('myApp')   // MUST depends on 'ui.router' and it's defined in src/Ui_Router/angular-ui-router-app.module.js
    .config(RoutesConfig); //or call an ui router service
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {  // Must these two providers. Provider will config $state and $urlRouter services
    // Reirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/tab1');  //it means come to /tab1 if users enter an invalid name i.e. /xyz etc - ie type https://localhost:44374/Home/AngularUiRouterApp#!/xyz and then it auto becomes https://localhost:44374/Home/AngularUiRouterApp#!/tab1.

    // Set up Ui states. Each state has a key (or tab), ie 'tab1', and has a content, ie html-table.html.
    // Whenever the corresponding tab in the html is clicked, the <ui-view></ui-view> of the html is replaced by the content of the key. 
    $stateProvider
      .state('tab1', {
        url: '/tab1',
        template: '<div> This is Tab 1 content </div>'
      })

      // equivalent to: Tab key = tab2 with content of html-table.html. Note the caption of tab2 will be named in the main html which is Views/Home/AngularUiRouterApp.cshtml
      // as if you type in a browser: https://localhost:44374/Home/AngularUiRouterApp#!/tab2
      .state('tab2', {url: '/tab2',templateUrl: '/src/Ui_Router/html-table.html'})
    ;
  }
})();