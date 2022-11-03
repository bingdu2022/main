// Angular Module: 'urApp' - a single and only module in /src/Ui_Router/

//the most recommended way to declare JavaScript variables is with camel case variable names

(function () {
  'use strict';

  ////below works but commented out - search //Multi-Dependencies of the sln. to see reasons
  //angular.module('urApp', []); // an independent module

  angular.module('myApp', ['ui.router']); // an independent module
})();   //the last () is to invoke (function(){...}) 
