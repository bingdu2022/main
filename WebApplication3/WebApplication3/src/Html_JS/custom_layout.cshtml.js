// jQuery vs document.addEventListener

// jQuery function starts with $ as in the below.
// How to do a mouse move event listener when the mouse moves over the whole body area 

// The  $('.navbar-toggle').blur(...):
// Hides the second top bar when mouse first clicks on the top bar button and then on anywhere of the web page body.
$(function () { // Same as document.addEventListener("DOMContentLoaded",...)

  // Same as document.querySelector('.navbar-toggle').addEventListener('..)
  $('.navbar-toggle').blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {

      //$(".navbar-collapse collapse").collapse("hide");    //this line DOES NOT work
      //$(".nav navbar - nav").hide();    //this line DOES NOT work
      //$(".navbar-collapse collapse").collapse();    //this line DOES NOT work
      //$(".collapse").collapse();    //this line DOES NOT work

      $(".navbar-collapse").collapse("hide");      //this line works

      //$("section1").hide();   //this line works

      //alert("This input field has lost its focus.");  //this line works
    }
  })
})

// The below is a mouse move event listener when the mouse moves over the whole body area 
document.querySelector("body").onmousemove = body_js;  //Note not .mousemove but .onMousemove
function body_js(event) {
  if (event.shiftKey === true) {
    console.log('event.clientX: ', event.clientX);
    console.log('event.clientY: ', event.clientY);
    console.log('window.innerWidth: ', window.innerWidth);
  }
}

