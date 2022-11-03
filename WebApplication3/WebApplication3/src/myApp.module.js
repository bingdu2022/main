// Angular Module: 'myApp' - a single module in /src/shopping/
// Angular module syntax: angular.module('x',['y']): x is module name and it depends on Module y, e.g. x $broadcast data and wants y to receive the data and do something e.g run a spinner etc.
// angular.module('x') means use the existing Module x and NOT register or create Module x.
// module.config method fires before module.run method
// All dependency modules get configured first.

//the most recommended way to declare JavaScript variables is with camel case variable names

(function () {
  'use strict';

  //Multi-Dependencies
  //1. shopping depends on Spinner. 2. urApp depends on ui.router 3. ui.router must relates to ng-app that is placed in the main web page or <html ng-app="myApp"> of _Layout.cshtml
  //4. 1-3 lead to the below module registering which works but may not be good: because both ShoppingModuleComponentsAngularJS.cshtml and AngularUiRouterApp.cshtml
  //have to have all the 'Spinner','shopping','ui.router','urApp' module js scripts where 'Spinner' and 'shopping' are not related to 'ui.router' and 'urApp'
  //As a result, the below is commented out and replace it with a new way.

  //angular.module('myApp', ['Spinner','shopping','ui.router','urApp']); // 1. registers an 'myApp' module: 'myApp' which is used in the MVC main web page: _Layout.cshtml ; 2. 'myApp' module depends on 'Spinner' etc. modules

  angular.module('myApp', []); // 1. registers an 'myApp' module: 'myApp' which is used in the MVC main web page: _Layout.cshtml ; 
  //2. 'myApp' module will be replaced by the 'myApp' of other independent cshtml web pages under Views/Home folder
  //3. this module can be ignored based on #2.
  //4. It implies the main module name of all the web pages under View/Home folder should be 'myApp'.

})();   //the last () is to invoke (function(){...})
