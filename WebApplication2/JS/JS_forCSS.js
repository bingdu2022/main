{
  let btn1 = document.getElementById('btn1');
  btn1.style.backgroundColor = 'white';
  btn1.onclick = () => {
    btn1.style.backgroundColor = 'red';
  }
  btn1.onkeyup = () => {
    btn1.style.backgroundColor = 'white';
  }

  ////dDOM or working with attributes in the DOM----------------

  ////get elements
  //let list = document.childNodes[0].nextSibling.childNodes[2].childNodes[3];
  //console.log(list);  //<ol>...</ol>
  //console.log(list.parentElement);  //<body>...</body>
  //console.log(list.previousSibling.previousSibling); // <button id="btn1"...

  ////get elements by tag - or get HTMLCollection(2)
  //let list2 = document.getElementsByTagName("li");
  //console.log(list2);//HTMLCollection(3) [li.border, li, li#special.border, special: li#special.border]
  //let list3 = document.getElementsByTagName("Button");
  //console.log(list3);//HTMLCollection(2) [button#btn1, button#btn2, btn1: button#btn1, btn2: button#btn2]
  //let list4 = document.getElementsByClassName("border");
  //console.log(list4);//HTMLCollection(2) [li.border, li#special.border, special: li#special.border]

  ////nodeName and nodeType
  //let list5 = document.getElementsByTagName('li');
  //console.log(list5);//HTMLCollection(3) [li.border, li, li#special.border, special: li#special.border]
  //if (list5[0].nodeType === 1) {
  //  console.log('element');
  //} else if (list5[0].nodeType === 3) {
  //  console.log('text');
  //}
  //console.log(list5[0].childNodes[0]);//"Order 1"
  //console.log(list5[0].childNodes[0].nodeName);//#text
  //console.log(list5[0].nodeName);//LI

  ////nodeName and nodeType
  //let list6 = document.getElementsByTagName('p');
  //console.log(list6);//HTMLCollection(2) [p, p]
  //console.log(list6[0].childNodes[0].nodeValue);//important - nodeType 3 has nodeValue
  //console.log(list6[1].childNodes[0].nodeName);//STRONG - nodeType 1 has null nodeValue
  //console.log(list6[1].childNodes[1].nodeValue);// information

  //console.log(list6[0].childNodes[0]);
  //console.log(list6[0].childNodes[0].nodeValue='A change from js');

  //let list7 = document.getElementsByTagName('ol');
  //let olList = list7[0];
  //console.log(olList);
  //olList.onmouseover = () => {
  //  console.log('You have no permissions');
  //  prompt('You need permissions');
  //};

  ////Event lishener
  ////find a list of elements and change the text of one of them
  //let list8 = document.getElementsByTagName('ol');
  //let olList8 = list8[0];
  //console.log(olList8);
  //olList8.onmouseover = () => {
  //  console.log('You have no permissions');
  //  console.log(document.getElementById('li2').innerHTML);
  //  document.getElementById('li2').innerHTML = 'JS changes Order 2 to this when hovering mouse here. ';
  //};

  ////find an element and change its text on mouseover and mouseleave
  //let olList8_1 = document.getElementById('li2');
  //console.log(olList8_1);
  //olList8_1.onmouseover = () => {
  //  console.log('You have no permissions');
  //  document.getElementById('li2').innerHTML = 'JS changes Order 2 to this when hovering mouse here. ';
  //};
  //olList8_1.onmouseleave = () => {
  //  olList8_1.innerHTML = 'Order 2';
  //}

  ////some elements have attributes, so use attributes to find elements in html
  ////attributes are case-insensitive in the below or in JS
  //let inputAttr = document.getElementById('input1');
  //console.log(inputAttr.attributes);//NamedNodeMap {0: id, 1: type, 2: value, 3: extra1, id: id, type: type, value: value, extra1: extra1, length: 4}
  //console.log(inputAttr.value);//Home
  //console.log(inputAttr.hasAttribute('extra1'));//true
  //console.log(inputAttr.getAttribute('value'));//Home

  ////add notes to HTML in JS over DOM
  //let b1 = document.getElementById('btn1');
  //let ol1 = document.getElementById('ol items');
  //let olIndex = 4;
  //btn1.onclick = function () {
  //  let node = document.createElement('li');
  //  console.log(node);
  //  node.appendChild(document.createTextNode('New ' + olIndex));
  //  ol1.appendChild(node);
  //  olIndex++;
  //};



}