console.log(document.getElementById("section1"));
console.log(document instanceof HTMLDocument);

function sayHello() {
  this.textContent = "Said"; //this line doesn't work for this method
  var input1 = document.getElementById("input1").value;
  var message = "<h3>Hello, " + input1 + "!</h3>";
  if (input1 === '') {
    // Do nothing or just clear out div2 content
    document.getElementById("div2").innerHTML = '';
  } else {
    document.getElementById("div1").textContent = message;
    document.querySelector("#div2").innerHTML = message;  /*#x: use css id selector*/
  }
}

// Unobstrusive event binding
document.querySelector('section2 button') //must be exactly like this to make this.textContent = "Said" work
  .addEventListener("click", sayHello2);  //Note not 'onClick'. only one button (with click) in <section2 .../>
function sayHello2(event) {
  this.textContent = "Said"; //this line works for this method only if doing document.querySelector('section2 button').
  var input = document.querySelector("section2 input").value;  //looks for the only one input or first input under <section2 ...> 
  var message = "<h3>Hello, " + input + "!</h3>";
  if (input === '') {
    // Do nothing or just clear out div content
    document.querySelector("section2 div").innerHTML = '';    //looks for the only one div or first div under <section2 ...> 
  } else {
    document.querySelector("section2 div").innerHTML = message;  /*#x: use css id selector*/
  }
}

// Directly link a function to onClick of a button:
var i = 3;
document.querySelector("section" + i +" button").onclick = sayHello3;
function sayHello3(event) {
  this.textContent = "Said";  //this line works for this method
  var input = document.querySelector("section3 input").value;  //looks for the only one input or first input under <section2 ...> 
  var message = "<h3>Hello, " + input + "!</h3>";
  if (input === '') {
    // Do nothing or just clear out div content
    document.querySelector("section3 div").innerHTML = '';    //looks for the only one div or first div under <section2 ...> 
  } else {
    document.querySelector("section3 div").innerHTML = message;  /*#x: use css id selector*/
  }
}

// DOMContentLoaded: adds event handlers before any images, css or other scripts 
// Therefore, there is no need to add this script at the end of this HtmlJs_InHtmlBody.cshtml.js
document.addEventListener("DOMContentLoaded",
  function (event) {
    var section = "section" + 4;

    // Unobstrusive event binding
    document.querySelector(section + ' button') //must be exactly like this to make this.textContent = "Said" work
      .addEventListener("click", sayHello4);  //only one button (with click) in <section2 .../>

    function sayHello4(event) {
      this.textContent = "Said";  //this line works for this method
      var input = document.querySelector(section + " input").value;  //looks for the only one input or first input under <section2 ...>
      var message = "<h3>Hello, " + input + "!</h3>";
      if (input === '') {
        // Do nothing or just clear out div content
        document.querySelector(section + " div").innerHTML = '';    //looks for the only one div or first div under <section2 ...>
      } else {
        document.querySelector(section + " div").innerHTML = message;  /*#x: use css id selector*/
      }
    };

    //other enent handlers ...
  }

);

// Use event of event handlers:
document.querySelector("section5 button").onclick = sayHello5;
function sayHello5(event) {
  var section= 'section' + 5;
  console.log("event: ", event);
  this.textContent = "Said";  //this line works for this method
  var input = document.querySelector(section + " input").value;  //looks for the only one input or first input under <section2 ...>
  var message = "<h3>Hello, " + input + "!</h3>";
  if (input === '') {
    // Do nothing or just clear out div content
    document.querySelector(section +' div').innerHTML = '';    //looks for the only one div or first div under <section2 ...>
  } else {
    document.querySelector(section + ' div').innerHTML = message;  /*#x: use css id selector*/
  }
}
document.querySelector("section5 button").onmousemove = sayHello5_2;  //Note not .mousemove but .onMousemove
function sayHello5_2(event) {
  if (event.shiftKey === true) {
    console.log('event.clientX: ', event.clientX);
    console.log('event.clientY: ', event.clientY);
  }
}

//Event handling for Ajax call which will call a tool of /src/Html_JS/ajax-untils.js
document.addEventListener("DOMContentLoaded",
  function (event) {
    var section = 'section' + 9;
    // Unobstrusive event binding
    document.querySelector(section + ' button')
      .addEventListener('click', function () {

        // Ajac call to server to get the name, which equals to the result of https://localhost:44374/src/Html_js/data-on-server.txt
        $ajaxUtils.sendGetRequest("/src/Html_JS/data-on-server.txt", function (request) { //it's strange to use (request) and not (response) here
          var name = request.responseText;
          // Below will not immediately get the expected result if it's placed outside of this $ajaxUtils.sendGetRequest(..) which is an asynchronous call
          document.querySelector(section + ' div').innerHTML = "<h3>Hello " + name + "!</h3>";
        }, false);  //false is the third arg for returning a non-json data.

      });
  }
)

//Event handling for Ajax call which will call a tool of /src/Html_JS/ajax-untils.js
document.addEventListener("DOMContentLoaded",
  function (event) {
    var section = 'section' + 11;
    // Unobstrusive event binding
    document.querySelector(section + ' button')
      .addEventListener('click', function () {

        // Ajac call to server to get the name, which equals to the result of https://localhost:44374/src/Html_js/json-data-on-server.json
        $ajaxUtils.sendGetRequest("/src/Html_JS/json-data-on-server.json", function (request) { //it's strange to use (request) and not (response) here
          var name = request;
          // Below will not immediately get the expected result if it's placed outside of this $ajaxUtils.sendGetRequest(..) which is an asynchronous call
          document.querySelector(section + ' div').innerHTML = "<h3>Hello " + name.firstName +" " + name.lastName + " (" + name.age + " years old) " + "!</h3>";
        }, true);  //true is the third arg for returning a json data.

      });
  }
)
