// JS vs Html

// DOM: the HTML DOM is an Object Model for HTML. It defines: When a web page is loaded, the browser creates 
// a D ocument O bject M odel of the page. When you want to access HTML elements with JavaScript, 
// you have to find the elements first. The easiest way to find an HTML element in the DOM, is by using the element id.

console.log(document.getElementById("section1"));
console.log(document instanceof HTMLDocument);

// With a querySelector statement, you can select an element based on a CSS selector. 
//   This means you can select elements by ID, class, or any other type of selector.
// If you only need to select an element by ID or class, you can use getElementById or getElementsByClassName, respectively. 
// If you need to use a more elaborate rule to select elements, the querySelector method is your best option.

// Method 1 that clicking button calls its js to update DOM: the button is NOT directly linked to this function, so can't use 'this.'
// <button onclick="sayHello();" of cshtml/html calls the below function to update the web page (cshtml) - done on the client side or front end.
function sayHello() {  // it's triggered by <button onclick="sayHello();" ..
  this.textContent = "Said"; //this line doesn't work for this method
  var input1 = document.getElementById("input1").value;
  var message = "<h3>Hello, " + input1 + "!</h3>";
  if (input1 === '') {
    // Do nothing or just clear out div2 content
    document.getElementById("div2").innerHTML = '';
  } else {
    document.getElementById("div1").textContent = message;  // .textContent doesn't honor <h3> etc styles
    document.querySelector("#div2").innerHTML = message;  /*#x: use css id selector*/
  }
}

// Method 2 that clicking button calls its js to update DOM: the button is directly linked to this function by pre-setting up an .addEventListener(.), so can use 'this.'
// Unobstrusive event binding: users' clicking on a button of cshtml/html calls the below function to update DOM
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

// the above .addEventListener can add multiple events to a particular element. 
// the below .onclick can add only a single event to an element.
// Example:
//   <script>
//      let btn_element = document.getElementById("btn");
//      btn_element.addEventListener("click", () => {document.getElementById("text1").innerHTML = "Task 1 is performed";})
//      btn_element.addEventListener("click", () => {document.getElementById("text2").innerHTML = "Task 2 is performed";});
//  </script >

// Method 3 that clicking button calls its js to update DOM: the button is directly linked to this function, so can use 'this.'
// Directly link a function to onClick of a button: users' clicking on a button of cshtml/html calls the below function to update DOM
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

// Method 4 that clicking button calls its js to update DOM:
// DOMContentLoaded: adds event handlers before any images, css or other scripts 
// Therefore, there is no need to add this script at the end of this JS_InBody.cshtml.js
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

//AJAX is an acronym that stands for Asynchronous JavaScript and XML
//When using AJAX, there is no need to update the entire page every time, as only its specific part is updated.
//Event handling for Ajax call which will call a tool of /src/JS/ajax-untils.js
document.addEventListener("DOMContentLoaded",
  function (event) {
    var section = 'section' + 9;
    // Unobstrusive event binding
    document.querySelector(section + ' button')
      .addEventListener('click', function () {

        // Ajac call to server to get the name data, which equals to the result of https://localhost:44374/src/JS/data-on-server.txt
        $ajaxUtils.sendGetRequest("/src/JS/data-on-server.txt", function (responseText) { //it's strange to use (request) and not (response) here
          var name = responseText;
          // Below will not immediately get the expected result if it's placed outside of this $ajaxUtils.sendGetRequest(..) which is an asynchronous call
          document.querySelector(section + ' div').innerHTML = "<h3>Hello " + name + "!</h3>";
        }, false);  //false is the third arg for returning a non-json data.

      });
  }
)

// 1. Users click an HTML button. 2. the button event listener in the js does an ajax call. 3. the call gets the data from server. 
// 4. the js finds DOM element and displays the data in the innerHTML of the element.

//Event handling for Ajax call which will call a tool of /src/JS/ajax-untils.js
document.addEventListener("DOMContentLoaded",
  function (event) {
    var section = 'section' + 11;
    // Unobstrusive event binding
    document.querySelector(section + ' button')
      .addEventListener('click', function () {

        // Ajax call to server to get the name, which equals to the result of https://localhost:44374/src/JS/json-data-on-server.json
        $ajaxUtils.sendGetRequest("/src/JS/json-data-on-server.json", function (request) { //it's strange to use (request) and not (response) here
          var name = request;
          // Below will not immediately get the expected result if it's placed outside of this $ajaxUtils.sendGetRequest(..) which is an asynchronous call
          document.querySelector(section + ' div').innerHTML = "<h3>Hello " + name.firstName +" " + name.lastName + " (" + name.age + " years old) " + "!</h3>";
        }, true);  //true is the third arg for returning a json data.

      });
  }
)

//// below is moved to /src/JS/custom_layout.cshtml.js

//// Hide the second top bar when mouse clicks on the web page body. It or the below does not work here. 
////jQuery function starts with $ as in the below.
//$(function () { // Same as document.addEventListener("DOMContentLoaded",...)
//  // Same as document.querySelector('.navbar-toggle').addEventListener('..)
//  $('.navbar-toggle').blur(function (event) {
//    var screenWidth = window.innerWidth;
//    if (screenWidth < 768) {
//      $(".navbar-collapse collapse").collapse('hide');
//      //alert("This input field has lost its focus.");
//    }
//  })
//})
