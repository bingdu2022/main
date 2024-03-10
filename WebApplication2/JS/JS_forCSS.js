{
  let btn1 = document.getElementById('btn1');
  btn1.style.backgroundColor = 'white';
  btn1.onclick = () => {
    btn1.style.backgroundColor = 'red';
  }
  btn1.onkeyup = () => {
    btn1.style.backgroundColor = 'white';
  }

  //dDOM or working with attributes in the DOM----------------

  // An element is a fundamental building block of an HTML or XML document.
  // In standard HTML and XML, an element is constructed with either the syntax <x>...</x> (with explicit opening and closing tags)
  // or the self-closing syntax <x ... /> for elements that don't have content.

  // For elements like <img>, <br>, or <input>, which don't have content, the self-closing syntax <x ... /> is used. For example:
// <img src="image.jpg" alt="An image" />
// <br />
// <input type="text" placeholder="Enter text" />

// note that a content of an element is accessed over .innerHTML 

  // While the childNodes property and its related properties like nextSibling can be used to navigate the DOM,
  // they are less common and can be error-prone. Using more modern and convenient methods like getElementById, querySelector,
  // or direct property access (e.g., document.head) is generally more readable, maintainable, and less prone to issues when the document structure changes.
  // So, the below about 'childnotes'-related is for knowledge but not recommended to use:

  //get elements
  let list = document.childNodes[0];
  console.log('document.childNodes', list);  // <!DOCTYPE html>
  list = document.childNodes[0].nextSibling;
  console.log('document.childNodes.nextSibling', list);  // <html>
  list = document.childNodes[0].nextSibling.childNodes[0];
  console.log('document.childNodes.nextSibling.childNodes[0]', list);  // <head>
  list = document.childNodes[0].nextSibling.childNodes[1];
  console.log('document.childNodes.nextSibling.childNodes[1]', list);  // #text "\n"
   list = document.childNodes[0].nextSibling.childNodes[2];
  console.log('document.childNodes.nextSibling.childNodes[2]', list);  // <body>
  list = document.childNodes[0].nextSibling.childNodes[3];
  console.log('document.childNodes.nextSibling.childNodes[3]', list);  // undefined
  list = document.childNodes[0].nextSibling.childNodes[2].childNodes[0];
  console.log('document.childNodes.nextSibling.childNodes[2].childNodes[0]', list);  // #text "\n  "
  list = document.childNodes[0].nextSibling.childNodes[2].childNodes[1];
  console.log('document.childNodes.nextSibling.childNodes[2].childNodes[1]', list);  // <input id="input1" type="text" value="Home" extra1="extra 1">

  list = document.childNodes[0].nextSibling.childNodes[2].childNodes[3];
  console.log(list);

  //< !DOCTYPE html >    < !-- =  document.childNodes[0]-- >
  //  <html>     <!--  document.childNodes[0].nextSibling -->
  //    <head>   <!--  document.childNodes[0].nextSibling.childeNodes[0] -->
  // ...
  //    </head>     <!-- document.childNodes[0].nextSibling.childeNodes[1] = #text "\n" -->
  //    <body>   <!--  document.childNodes[0].nextSibling.childeNodes[2] -->

  // note that adding comments like <!-- ... --!> in the above causes errors in list = document.childNodes[0].nextSibling.childNodes[2];
  // so, please don't add comments

  console.log(list.parentElement);  //<body>...</body>
  console.log(list.previousSibling.previousSibling); // <button id="btn1"...

  //<ol id="ol items">
  //  <li class="border">Order 1</li>  <!-- class is for styling multi elements -->
  //  <li id="li2">Order 2</li>  <!-- only id, so target a unique styling -->
  //  <li class="border" id="special">Order 3</li>  <!-- both class and id for styling multi elements + a unique style from #special -->
  //</ol>


  //get elements by tag - or get HTMLCollection(2)

  let list2 = document.getElementsByTagName("li");
  console.log(list2);//HTMLCollection { 0: li.border, 1: li#li2, 2: li#special.border, length: 3, … }
  let list3 = document.getElementsByTagName("Button");
  console.log(list3);//HTMLCollection { 0: button#btn1, 1: button#btn2, length: 2, … }
  let list4 = document.getElementsByClassName("border");
  console.log(list4);//HTMLCollection { 0: li.border, 1: li#special.border, length: 2, … }

  // recommended methods:
  let headElement = document.querySelector('head');
  console.log(headElement);
  let li2Element = document.getElementById('li2');
  console.log(li2Element);

  //nodeName and nodeType
  let list5 = document.getElementsByTagName('li');
  console.log(list5);//HTMLCollection { 0: li.border, 1: li#li2, 2: li#special.border, length: 3, … }
  if (list5[0].nodeType === 1) {
    console.log('element');
  } else if (list5[0].nodeType === 3) {
    console.log('text');
  }
  console.log(list5[0].childNodes[0]);//"Order 1"
  console.log(list5[0].childNodes[0].nodeName);//#text
  console.log(list5[0].nodeName);//LI

  //nodeName and nodeType
  let list6 = document.getElementsByTagName('p');
  console.log(list6);//HTMLCollection { 0: p, 1: p, length: 2 }
  console.log(list6[0].childNodes[0].nodeValue);//important - nodeType 3 has nodeValue
  console.log(list6[1].childNodes[0].nodeName);//STRONG - nodeType 1 has null nodeValue
  console.log(list6[1].childNodes[1].nodeValue);// information

  console.log(list6[0].childNodes[0]);
  console.log(list6[0].childNodes[0].nodeValue='A change from js');

  let list7 = document.getElementsByTagName('ol');
  let olList = list7[0];
  console.log(olList);
  olList.onmouseover = () => {
    console.log('You have no permissions: from oList');
    //prompt('You need permissions');
  };

  //Event lishener
  //find a list of elements and change the text of one of them

  //let list8 = document.getElementsByTagName('ol');
  //let olList8 = list8[0];
  //console.log(olList8);
  //olList8.onmouseover = () => {
  //  console.log('You have no permissions: from oList8');
  //  console.log(document.getElementById('li2').innerHTML);
  //  document.getElementById('li2').innerHTML = 'JS changes Order 2 to this when hovering mouse here. ';
  //};

  //find an element and change its text on mouseover and mouseleave
  let olList8_1 = document.getElementById('li2');
  console.log(olList8_1);
  olList8_1.onmouseover = () => {
    console.log('You have no permissions: from oList8_1');
    document.getElementById('li2').innerHTML = 'JS changes Order 2 to this when hovering mouse here. ';
  };
  olList8_1.onmouseleave = () => {
    olList8_1.innerHTML = 'Order 2';
  }

  //some elements have attributes, so use attributes to find elements in html
  //attributes are case-insensitive in the below or in JS
  let inputAttr = document.getElementById('input1');
  console.log(inputAttr.attributes);//NamedNodeMap {0: id, 1: type, 2: value, 3: extra1, id: id, type: type, value: value, extra1: extra1, length: 4}
  console.log(inputAttr.value);//Home
  console.log(inputAttr.hasAttribute('extra1'));//true
  console.log(inputAttr.getAttribute('value'));//Home

  //add notes to HTML in JS over DOM
  let b1 = document.getElementById('btn1');
  let ol1 = document.getElementById('ol items');
  let olIndex = 4;
  btn1.onclick = function () {
    let node = document.createElement('li');  // the node has many attributes and methods
    console.log(node);
    node.appendChild(document.createTextNode('New ' + olIndex));  // 
    ol1.appendChild(node);  // 'li' is inside ol1, so ...
    olIndex++;
  };



}