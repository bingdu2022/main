// Angular Module: 'myApp' - a single module in /src/shopping/
// Angular module syntax: angular.module('x',['y']): x is module name and it depends on Module y, e.g. x $broadcast data and wants y to receive the data and do something e.g run a spinner etc.
// angular.module('x') means use the existing Module x and NOT register or create Module x.
// module.config method fires before module.run method
// All dependency modules get configured first.

//the most recommended way to declare JavaScript variables is with camel case variable names

(function () {
  'use strict';
  angular.module('myApp', ['Spinner']); // 1. registers an 'myApp' module: 'myApp' which is used in the MVC main web page: _Layout.cshtml ; 2. 'myApp' module depends on 'Spinner' module
})();   //the last () is to invoke (function(){...}) 
