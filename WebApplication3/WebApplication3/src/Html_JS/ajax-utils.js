//Coding Ajax GET method
(function (global) {
  // Set up a namespace for our untility
  var ajaxUtils = {};

  // Resturns an HTTP request object or check if or not the browser supports ajxa. 
  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return (new XMLHttpRequest());
    }
    else if (window.ActiveXObject) {
      // For very old IE browsers (optional)
      return (new ActiveXObject("Microsoft.XMLHTTP"));
    }
    else {
      global.alert("Ajax is not supported!");
      return (null);
    }
  }

  // Makes an Ajax GET request to 'requestUrl'
  // Note this is a asynchrononus request, so others may use it too while a user has called it and wait for its response
  ajaxUtils.sendGetRequest =
    function (requestUrl, responseHandler, isJsonResponse) {  // (different requestUrl, responseHandler) from different users may happen at a period of time while all are waiting for responses
      var request = getRequestObject();

      // Set up parameters we request
      request.onreadystatechange =  //between browser and server
        function () {  // this function gets called after server responses. Must have this function because (different requestUrl, responseHandler) from different users may happen at a period of time while all are waiting for responses
          handleResponse(request, responseHandler, isJsonResponse);
        };
      request.open("GET", requestUrl, true);  //true means asynchronous. Otherwise, false means freezing now until server responses
      request.send(null); //for POST only, i.e., need to send body (GET doesn't need to send a body)
    };

  // Only calls use provided 'responseHandler'
  // function if response is ready and not an error
  function handleResponse(request, responseHandler, isJsonResponse) {  //responseHandler will be a function to be passed in
    if ((request.readyState == 4) && (request.status == 200)) {  // Must check 4 and 200

      // Default to isJsonResponse = true
      if (isJsonResponse == undefined) isJsonResponse = true;

      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText))
      } else {
        responseHandler(request);
      }
    };
  }

  // Expose utility to the global object
  global.$ajaxUtils = ajaxUtils;

})(window);
