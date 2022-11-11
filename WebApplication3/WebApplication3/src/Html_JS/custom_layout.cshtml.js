// the  $('.navbar-toggle').blur(...) seems not working though it can work for other elements i.e. hide section1 etc.
// Hide the second top bar when mouse clicks on the web page body. It does not work
//jQuery function starts with $ as in the below.
$(function () { // Same as document.addEventListener("DOMContentLoaded",...)

  // Same as document.querySelector('.navbar-toggle').addEventListener('..)
  $('.navbar-toggle').blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {

      //$(".navbar-collapse collapse").collapse("hide");    //this line DOES NOT work
      //$(".nav navbar - nav").hide();    //this line DOES NOT work
      //$(".navbar-collapse collapse").collapse();    //this line DOES NOT work
      //$(".collapse").collapse();    //this line DOES NOT work
      $(".navbar-collapse").collapse("hide");    

      //$("section1").hide();   //this line works

      //alert("This input field has lost its focus.");  //this line works
    }
  })
})

document.querySelector("body").onmousemove = body_js;  //Note not .mousemove but .onMousemove
function body_js(event) {
  if (event.shiftKey === true) {
    console.log('event.clientX: ', event.clientX);
    console.log('event.clientY: ', event.clientY);
    console.log('window.innerWidth: ', window.innerWidth);
  }
}

