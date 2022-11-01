﻿// Angular Module: 'myApp' - a single and only module in /src/shopping/

//the most recommended way to declare JavaScript variables is with camel case variable names

(function () {
  'use strict';
  angular.module('myApp', ['Spinner']); // []); //, 'myApp' module depends on 'Spinner' module
})();   //the last () is to invoke (function(){...}) 
