
(function (global) {
  var dc = {};
  var HtmlPage1 = "/src/Html_JS_DynamicViews/html-page1.html"

  // Convinience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.insertHtml = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>'";
    html += "<img src='/images/loading.gif'></div>";
    insertHtml(selector, html);
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show HtmlPage1
    showLoading("#main-content");

    $ajaxUtils.sendGetRequest(  // Use /src/Html_JS/ajax-utils.js
      HtmlPage1,
      function (response) {
        document.querySelector('#main-content').innerHTML = response.responseText;
      },
      false  // Don't want to convert it to JSON or just whatever is passed in or html here
    );
  });

  global.$dc = dc;
})(window);