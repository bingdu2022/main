﻿//AJAX is an acronym that stands for Asynchronous JavaScript and XML
//When using AJAX, there is no need to update the entire page every time, as only its specific part is updated.
//onclick='..' of cshtml/html can call js/ajax functions: $dc.xxx() to get files (html or json data) from server and update parts of the web page.
//(function (global){..})(window); acts as Initialize and also holds onclick functions to be used by onclick of cshtml/html 

// The final web page is dynamically built with _Layout.cshtml + view000, view100s or view200s based on the array of objects (view100s-json-data-on-server.json and view200s-json-data-on-server.json) using Ajax
// Video: 'Chaikin-USING JAVASCRIPT TO BUILD WEB APPLICATIONS - Document Object Model, Ajax.mp4'

// The coding design of this main js is:
// Code (function (global){..})(window); which is auto loaded/executed along with the web page.
// ..1. (function (global...)) contains document.addEventListener("DOMContentLoaded",..) which first loads view000
// ..2. (function (global...)) contains several methods, i.e. insertHtml(), $dc.xxx etc.
// ..3. onclick='..' of cshtml/html can call js/ajax functions: $dc.loadView000(), $dc.loadView100s(), $dc.loadView200s() to get files (html or json data) from server and update parts of the web page.
// ..4. onclick='..' can pass in a parameter that is used by a local variable i.e. _lastName in the js file.
// ..5. use _lastName to loop/modify the ajax-read-in json object in the js file.

// Use view200s-json-data-on-server.json as an example,
// var obj = view100sView200s[i];   //view200s-json-data-on-server.json = [{.},{.} . ], so it's an array with object elements
// if (obj['view100s'].lastName === _lastName) {  // it tells we can use object['attributeName'].value to access the value of an object key or attribute

// From users' perspective, after the web page is loaded, they can click on buttons or href links (onclick $dc.xxx to server) to see view000, view100s or view200s.

// A strange issue: not colored texts in \WebApplication3\src\JS\custom_layout.cshtml.js
// Fix: change custom_layout.cshtml.js to custom_lay1out.cshtml.js makes the colors reappear. 
//      The colors are still there after reversing the change

(function (global) {
  var dc = {};
  // Video 2:00
  var view000 = "/src/JS_DynamicViews/view000.html" // Video 1:33

  var allViewsUrl = "/src/JS_DynamicViews/view100s-json-data-on-server.json";  // an array of objects. Video 1:40
  var view100sTitleHtml = "/src/JS_DynamicViews/view100s-title.html";
  var view100sClickHtml = "/src/JS_DynamicViews/view100s-click.html";
  var view200sUrl = "/src/JS_DynamicViews/view200s-json-data-on-server.json?view100s=";  // Video: 1:57:26 for json and Video: 1:58:50 for json?view100s= which is replaced with a simple array loop check.
  var view200sTitleHtml = "/src/JS_DynamicViews/view200s-title.html";
  var view200Html = "/src/JS_DynamicViews/view200.html";


  // Convinience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  // It happens before loading view000 and then is replaced by view000. Its purpose is to show users with a 'waiting' icon before loading view100s is finished.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='/images/loading.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}' with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue); //"g" tells to replace all the hits for propToReplace in the string with propValue
    return string;
  };

  // On page load (before images, CSS ...)
  document.addEventListener("DOMContentLoaded", function (event) {
    // During loading view000, show waiting icon.
    showLoading("#main-content");

    // On first load, show view000
    $ajaxUtils.sendGetRequest(  // Use the sendGetRequest method of /src/JS/ajax-utils.js
      view000,  // $ajaxUtils.sendGetRequest is trying to get view000 Asychronouslly
      function (responseText) {  // Does the below if $ajaxUtils.sendGetRequest successfully gets view000 from server. Here responseText is just a symbol or can be replaced with view000 or any variable.
        document.querySelector('#main-content').innerHTML = responseText;  // Based on the third arg (false), response.responseText is an HTML or a string
      },
      false  // Don't want to convert it to JSON or just whatever is passed in or html here, so the above response.responseText is an HTML or a string
    );
  });

  // Load view000
  dc.loadView000 = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(view000,function (view000) {document.querySelector('#main-content').innerHTML = view000;},false);
  };

  // Load the view100s views summary:
  //   1. Fetch the view100s-json-data-on-server.json data (views) from server  - Ajax call 1
  //   2. If #1 succeeds, fetch the view100s-title.html from server - Ajax call 2
  //   3. If #2 succeeds, fetch the view100s-click.html from server - Ajax call 3
  //   4. If #3 succeeds, A. generate View100s from combining view100s-title.html and view100s-click.html based on views in the client or front end.
  //                      B. insert View100s html into "#main-content"

  // Load the view100s views:
  dc.loadView100s = function () {
    showLoading("#main-content"); // in case it takes a while to finish loading the below, so show a spinner (waiting gif) to users
    $ajaxUtils.sendGetRequest(  // Ajax call (1)
      allViewsUrl,  //   1. Fetch the view100s-json-data-on-server.json data (views) from server
      buildAndShowView100sHTML  // if fetching allViewsUrl successfully, pass its data (views) to buildAndShowView100sHTML and execute buildAndShowView100sHTML(views)
                                // Here buildAndShowView100sHTML is the address of Function buildAndShowView100sHTML(..)
    );  //default: ,True for json object. Note .sendGetRequest has three args.
  };

  // Builds the HTML page with View100s views based on the data (view100s-json-data-on-server.json) from the server
  function buildAndShowView100sHTML(views) {
    // Load title of categories page
    $ajaxUtils.sendGetRequest(  // Ajx call (2) inside Ajax call (1) 
      view100sTitleHtml,  //   2. If #1 succeeds, fetch the view100s-title.html from server
                          // After Ajax gets view100sTitleHtml, below continues adding it with more contents, i.e. many view100 views

      function (view100sTitleHtml) {
        // Retrieve single view100s view
        $ajaxUtils.sendGetRequest(  // Ajx call (3) inside Ajax call (2) 
          view100sClickHtml,  //   3. If #2 succeeds, fetch the view100s-click.html from server
                              //      and then below calls buildView100sHTML to do view100sTitleHtml + view100sClickHtml
          function (view100sClickHtml) {
            var view100Html =
              buildView100sHTML(views, view100sTitleHtml, view100sClickHtml); // 4. If #3 succeeds, A.generate View100s from combining view100s - title.html and view100s - click.html based on views in the client or front end.
            insertHtml("#main-content", view100Html);  // B. insert View100s html into "#main-content"
          },
          false);
      },
      false
    );
  }

  // Combines view100sTitleHtml and view100sClickHtml
  function buildView100sHTML(views, view100sTitleHtml, view100sClickHtml) {
    var finalHtml =view100sTitleHtml;
    finalHtml += "<section class='row'>";

    // loop over view100s
    for (var i = 0; i < views.length; i++) {
      // Insert view100sClickHtml values
      var html = view100sClickHtml;
      var name = "" + views[i].firstName;
      var last_name = views[i].lastName;
      console.log("html: ", html);
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "last_name", last_name);
      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  // Load the loadView200s view
  var _lastName = '';
  dc.loadView200s = function (lastName) {
    showLoading("#main-content");

    //// Video uses the below ajax call, i.e., to get ../view200s-json-data-on-server.json?view100s=lastName, 
    //// but I don't have this API functionality. Instead, I just process view200s-json-data-on-server.json here to mimic ..?view100s=lastName.
    //// Therefore, I commented out the below line.
    //$ajaxUtils.sendGetRequest(view200sUrl + lastName, buildAndShowView200sHTML);  //default: True for json object

    _lastName = lastName;
    $ajaxUtils.sendGetRequest(view200sUrl, buildAndShowView200sHTML);  //default: True for json object: A. Fetch view200sUrl first

  };

  // Builds HTML for the View200s HTML page based on the data from the server
  function buildAndShowView200sHTML(view100sView200s) { //view100sView200s is an json object returned by fetching view200sUrl
    // Load title of View200s page
    $ajaxUtils.sendGetRequest(
      view200sTitleHtml,  //fetch view200s-title.html from server

      // Retrieve single view
      function (view200sTitleHtml) {
        // Retrieve single view
        $ajaxUtils.sendGetRequest(
          view200Html,  // fetch view200.html from server
          function (view200Html) {
            var view200sHtml =
              buildView200sHTML(view100sView200s, view200sTitleHtml, view200Html);  // combine view200sTitleHtml and view200.html by looping the data view100sView200s
            insertHtml("#main-content", view200sHtml);  // insert the result of buildView200sHTML to #main-content
          },
          false);
      },
      false
    );
  }

  // Use view data and tempate html to build View200s view HTML to be inserted into page
  function buildView200sHTML(view100sView200s, view200sTitleHtml, view200Html) {

    // The below line is to get view100sView200s with the view100s and view200s attributs by mimicing view200s-json-data-on-server.json?view100s=lastName
    // Note view100sView200s is an JSON object = view200s-json-data-on-server.json
    var tempJson;
    for (var i = 0; i < view100sView200s.length; i++) {
      var obj = view100sView200s[i];   //view200s-json-data-on-server.json = [{.},{.} . ], so it's an array with object elements
      console.log(view100sView200s[i]);
      console.log(obj);
      if (obj['view100s'].lastName === _lastName) {  // it tells we can use object['attributeName'].value to access the value of an object key or attribute
        tempJson = obj;
        break;
      }
    };
    view100sView200s = tempJson;

    //view100sView200s = JSON.parse(tempJson);

    view200sTitleHtml = insertProperty(view200sTitleHtml, "name", view100sView200s.view100s.firstName);
    view200sTitleHtml = insertProperty(view200sTitleHtml, "long_string", view100sView200s.view100s.longString);

    var finalHtml = view200sTitleHtml;
    finalHtml += "<section class='row'>";

    // loop over view200s
    var view200s = view100sView200s.view200s;
    var view100LastName = view100sView200s.view100s.lastName;
    for (var i = 0; i < view200s.length; i++) {
      // Insert view200 
      var html = view200Html;
      html = insertProperty(html, "view100LastName", view100LastName);
      html = insertProperty(html, "name", view200s[i].firstName);
      html = insertProperty(html, "last_name", view200s[i].lastName);
      html = insertProperty(html, "age", "$" + view200s[i].age.toFixed(2));  // to test .foFiexed
      html = insertProperty(html, "description", view200s[i].description);

      // Add clearfix after every second menu item
      if (i % 2 != 0) {
        html +="<div class='cleafix visible-lg-block visible-md-block'></div>"
      }

      finalHtml += html;
    }

    finalHtml += "</section>";
    return finalHtml;
  }

  // todo: Remove the class 'active' from the default ("JS DynamicViews") to switch to another page
  var switchMenuToActive = function () {
    // Remove 'active' from the default
    var classes = document.querySelector('#nav-js').className;  //look for <li id="nav-js"..> of _Layout.cshtml to find 'active' element
    classes = classes.replace(new RegExp("active", "g"), "");  //first clean out any places with 'active' or set to no active elements
    document.querySelector('#nav-js').className = classes;

    // Add 'active' to the element that we want to be active
    // The below #nav-js-dynamic should be a different id in 'real project' coding
    classes = document.querySelector("#nav-js-dynamic").className;  //id='nav-js-dynamic' is active, so here just pretend to switch to
    if (classes.indexOf("active") == -1) {
      classes += " active";
      document.querySelector('#nav-js-dynamic').className = classes
    }
  };

  global.$dc = dc;
})(window);