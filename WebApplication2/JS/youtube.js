let btn1 = document.getElementById('btn1');
btn1.disabled = true;

document.getElementById("button").onclick = function () {
  document.getElementById("confirm").innerHTML = "Order placed.";
  document.getElementById("button").style.display = "none";   // remove or hide the Confirm button after clicking on it.
}

/// Check if the username is already stored in localStorage
var username = localStorage.getItem('username');
console.log('Stored username:', username);

if (username === null) {
  // If not, prompt the user for a username
  console.log('Prompting user for a username');
  username = prompt('Enter your username:');

  if (username !== null && username !== '') {
    // Store the username in localStorage for future use
    localStorage.setItem('username', username);
    console.log('Username stored:', username);
  } else {
    // Handle the case where the user clicks "Cancel" or provides an empty username
    console.log('User canceled the prompt or entered an empty username.');
  }
}

// Use the username as needed
console.log('Username:', username);

// Display the username with an alert
alert('Username: ' + username);


// var, let, and const are all used for variable declarations in JavaScript
// In modern JavaScript development, it's generally recommended to use let and const over var

var age = 50;   // var  is function-scoped, does not have to be initialized with a value, and can be reassigned with a new value
console.log(age);
var message = "Age: = " + age;
console.log(message);

(function() {
  //IIFE - immediately invoked function expression
  var age = 5;      // var  is function-scoped, which means the age here is scoped or working within the function block.
  console.log("age in function is " + age);  // it's 5 in Inspector > Console: Logs tab
})();
console.log("age outside function is " + age);    // it's 50 in Inspector > Console: Logs tab

var y = 10;
let x = 20;

{
  //block
  let z = "30";   // let is block-scoped { } and must be initialized with a value, here z is different from the below z that is within another { ... }
  const w = 40;    // let is block-scoped { }, must be initialized with a value, and cannot be changed.
  {
    let z = 50;   // here z = 50 is different from the outside z = "30"
    console.log(z);
  }
  console.log(z + w);  // = 3040 and no errors even if a string + a number

  let myName = 'Bing';
  console.log(myName);
}


let x1 = {   // x1 is defined as an object. Each attribute ends with comma. Inside function has a name of 'fun' 
  name: "Cal",
  age: 10,
  favFood: 'Pizza ....',
  fun: function () {
    console.log("yyy");
  },
  fun2: function () {
    console.log("fun2");
    return "from fun2";
  }
};

console.log(x1);
console.log(x1.favFood);
console.log(x1.fun());  // must be x1.fun() without missing the ending round brachets or parentheses. It generates yyy and undefined in inspector>Logs tab
console.log(x1.fun2());  // It generates fun2 and from fun2 in inspector>Logs tab

let dat = new Date();
console.log(dat.toISOString());  // display a date in string
let grades = [10, 20, 2];  // define an array
console.log(grades);

let myName = 'Bing';  // signle or double quote are used to define a string
myName = myName.toUpperCase();
console.log(myName);

let yourName = new String("Bing Du");  // define a string object or an object of type String 
console.log(yourName);
console.log(typeof (yourName));
let age1 = new Number(12.2);   // define a number object. Using new Number() and creating wrapper objects for primitive types is not common practice in JavaScript, so just do let age1 = 12.2;
console.log(age1);
let ageValue = age1.valueOf();
console.log(ageValue);
console.log(typeof (ageValue));



{
  let x = 5 / 3;
  console.log(x);
  console.log(Number.MAX_SAFE_INTEGER);  // = 9007199254740991
  x = 9007199254740991;
  console.log(x);
  console.log(1 / 0);   // = Infinity and no error messages in inspector>Errors tab

  //+ - * / %
  var slices = 10;
  console.log(slices % 3);  //leftover = 1 after dividing 10/3

  slices += 1;
  console.log(slices);
  slices++;
  console.log(slices);
  ++slices;
  console.log(slices);

  slices *= 5;
  console.log(slices);

  let x1 = 5;
  let y = "10";
  let yInt = Number.parseInt(y);  // convert a number string to int
  console.log(x1 + yInt);

  yInt = Number.parseFloat("10.9999999 my fav");  //10.9999999
  console.log(yInt);
  console.log(Number.parseFloat("my 11.9"));  //NaN
  
}


{

  var input = prompt("Input a number:");
  console.log("Decimal:", input);
  console.log("Binary:", Number.parseInt(input,2));
  console.log("Octal:", Number.parseInt(input, 8));
  console.log("Hex:", Number.parseInt(input, 16));

  var input = Number(prompt("input a decimal:"));
  console.log(input, " in decimal to decimal:", input);
  console.log(input+ " in decimal to binary:", input.toString(2));
  console.log(input+" in decimal to octal:", input.toString(8));
  console.log(input+" in decimal to hex:", input.toString(16));

  
  let x = new Number(1234567);
  console.log(x.toExponential(5));
  console.log("$" + x.toFixed(2));
  console.log(x.toLocaleString());
  console.log(typeof (x.toFixed(2)));

  var abs = Math.abs(-10);
  console.log(abs);
  var goUp = Math.ceil(0.000001);
  console.log(goUp);
  var goDown = Math.floor(.9999);
  console.log(goDown);
  var powerUp = Math.pow(3, 2);
  console.log(powerUp);
  var roundMe = Math.round(4.94);
  console.log(roundMe);
  var getSign = Math.sign(-2);
  console.log(getSign);
  console.log(Math.trunc(4.9999));
  

//  let dy = 'Bing';
//  console.log(`I\nam ${dy}`);  //\n a line symbol
//  let longLine = 'a very long \
//second line'; console.log(longLine);
//  console.log(dy.length);
//  console.log(dy.charCodeAt(2));
//  console.log(dy[2]);
//  console.log(dy.concat("c1", 'c2'));
//  let longS = 'i am very long and have a good child.';
//  let search1 = 'good';
//  let search2 = 'nothing';
//  console.log(search1 + ' vs. ' + search2);
//  console.log(longS.includes(search2));
//  console.log(longS.includes(search1,10));
//  console.log(longS.indexOf(search1));  // alway 0-based
//  console.log(longS.indexOf(search2));

  //console.log('long'.substring(2,3));
  //console.log('long'.substr(2, 1));
  //console.log(' \t\nloNg \t \n'.toUpperCase().trim());  // \t: tab space
  //console.log(' long'.trimLeft());
  //console.log(' long '.trimEnd());
  //console.log('repeat me\t'.repeat(3));
  //console.log('code|12'.split('|'));
  //console.log('I*to death'.replace('*', ' '));
  //console.log('i am here'.search('am'));

  
  //let posi = {
  //  x: 10,
  //  y: 20,
  //  print: function () {
  //    console.log(`X: ${this.x}, Y: ${this.y}`);
  //  },
  //  childObject: { leftSide: 'this is left side' }
  //}
  //  console.log(posi);
  //let posiRef = posi;
  //posiRef.x = 15;
  //console.log(posi.x);
  //posi.print();

  //console.log(posi.childObject.leftSide);

  //function print() {
  //  console.log(`X: ${this.x}, Y: ${this.y}`);
  //}
  //print();  // you get X: undefined, Y: undefined

  //var name = prompt();
  //if (name === 'a') {  // 5<>'5' for === identify operator or strict equality for asking for equal in both value and data type
  //  // == can convert data type underline
  //  console.log('welcome a!');
  //}
  //else if (name === 'b') {  // 5<>'5' for === identify operator or strict equality for asking for equal in both value and data type
  //  // == can convert data type underline
  //  console.log('welcome b!');
  //}
  //else {
  //  console.log('Wrong guess');
  //}

  //var x = prompt();
  //if (x !== 'a') {  // this line = !(x=='a')
  //  console.log('welcome a')
  //}
  //  else if (x < 2 || x>=10) {
  //    console.log('you are right - 1<2');
  //}

  //var x = prompt();
  //if (x < 2 || x >= 10) {  // ||= or   &&= and
  //  console.log(`you are right -${x}<2 or ${x}>=10`);
  //}

  //let name = prompt("what is your name?");
  //switch (name) {
  //  case 'a':
  //  case 'c':
  //    console.log('welcome a or c');
  //    break;
  //  case 'b':
  //    console.log('welcom b');
  //    break;
  //  default:
  //    console.log("guess wrong");
  //    break;
  //}

  //let x = 1;
  //if (x === 1) console.log('x=1');
  //console.log(x === 1 ? `x(${x})=1` : 'x<>1');
  //x = 2;
  //let y = x === 1 ? `x(${x})=1` : 'x<>1';
  //console.log(y)

  //let i = 0;
  //while (i < 3) {
  //  console.log(i);
  //  i++;  // or i += 1;
  //}

  //let i = 0;
  //do {
  //  console.log(i);
  //  i++
  //} while (i < 3);

  //let password;
  //do {
  //  password = prompt('what is the passcode?');
  //} while (password.toLowerCase !== "let me in");

  //do {
  // var password2 = prompt('what is the passcode?');  //var: global or local to entire function regardless of block scope
  //} while (password2.toLowerCase() !== "let me in");

  //for (i = 10; i < 13;i++) { console.log(i) };

  //for (let i = 0; i < 10; i = i + 2) { console.log(i) };

  //let list = [1, 3, 5];
  //for (i = 0; i <= list.length; i++) { console.log(i) };

  //let s = "Search this string in a long one";
  //let charToSearch = 'a';
  //for (let i = 0; i <= s.length; i++) {
  //  if (s[i] === charToSearch) {
  //    console.log(s[i] + " is found at index: " + i);
  //  }
  //}

  ////find the first occurance
  //let s = "Search this string in a long one";
  //let charToSearch = 'a';
  //for (let i = 0; i <= s.length; i++) {
  //  if (s[i] === charToSearch) {
  //    console.log(s[i] + " is found at index: " + i);
  //    break;
  //  }
  //}

  ////Skip something
  //let s = "Search this string in a long one";
  //let charToSearch = 'a';
  //for (let i = 0; i <= s.length; i++) {
  //  if (s[i] === charToSearch) {
  //    continue;
  //  }
  //  console.log(s[i] + " is found at index: " + i);
  //}

  //let d = document.getElementById("dest");
  //for (let i = 1; i < 5; i++) {
  //  for (let j = i; j >=0; j--) {   //j--: count down or j=j-1
  //    //console.log(i, j);
  //    d.append(j + " ");
  //  }
  //  var br = document.createElement("br");
  //  d.appendChild(br);
  //}

  //let ages = [12, 13, 15];
  //ages.length = 10;   //expand ages from 3 to 10
  //ages[20] = 30;  //auto expand ages from 3 to 21

  ////multi dimention array
  //let stuff = [12, 'test', function (x) {console.log('hello')}];
  //let grades = [[1, 2], [20, 12]];
  //console.log(grades);
  //console.log(grades[0][1]);

  //let x = [];
  //x[0] = 12;
  //x[10] = 2;  // x of from 1 to 9 are empty
  //console.log(x);

  //let y = [1, 2, 4, 5, 6];
  //y.length = 3;
  //console.log(y);

  //let x = [1, 3, 5, 3, 5, 6, 7];
  //x.length = 10; //expands x
  //for (let i = 0; i < x.length; i++) {
  //  if (x[i] !== undefined) {   //undefined means x[i]=empty
  //    console.log(i);
  //  }
  //}

  //let found = false;
  //let search = 5;
  //let x = [1, 3, 5, 3, 5, 6, 7];
  //for (let i = 0; i < x.length; i++) {
  //  if (x[i] === search) {
  //    //found
  //    console.log(x[i] + ' at ' + i);
  //    found = true;
  //  }
  //}

  //let grades = [];
  //while (true) {
  //  let input = prompt("Add a grade");
  //  if (input === 'q' || input===null) { break;}  //null = Esc key
  //  grades.push(Number(input));  //assign input to the next empty element
  //  console.log(grades);
  //}

  //let x = [1, 2, 3];
  //console.log(x);
  //x.push(5);
  //console.log(x);
  //console.log(x.length);
  //console.log(x.pop() + " at Pop 1");  //remove one from the last
  //console.log(x.pop() + " at Pop 2");
  //console.log(x);  // shows x=[1,2] after the 2 pops
  //x.unshift(40); //insert 40 to the first position of x and 
  //console.log(x); // x=[40,1,2]
  //x.shift(50);
  //console.log(x);  //x=[1,2] ?
  //x.push(3, 4, 5);
  //console.log(x);  //x=[1,2,3,4,5]
  //x.splice(2, 3);  //remove 3 elements starting from 2 index
  //console.log(x);  //x=[1,2]
  //x.splice(1, 0, 7, 8, 9); //insert 7,8,9 from index 1; 0: delete nothing
  //console.log(x);  //x=[1,7,8,9,2]
  //x.splice(1, 2, 0, 0, 0, 0); //delete 7,8 and insert 0,0,0,0 at index 1
  //console.log(x); //x=[1,0,0,0,0,9,2]

  //let x = [1, 3, 10, 4, 8, 2, 3];
  //console.log(x);
  //x.reverse();
  //console.log(x);
  //x.sort(); //alphbatic by default
  //console.log(x);
  //x.sort(function (a, b) { return a - b });
  //console.log(x);
  //x.reverse();
  //console.log(x);
  //x.fill(-1, 0, x.length); //change everything with -1 in x
  //console.log(x);

  //let x = [1, 2, 3];
  //let y = [2, 4, 6];
  //x.concat(y);
  //console.log(x);
  //let z = x.concat(y);
  //console.log(z);
  //console.log(z.includes(4) + ' at index ' +z.indexOf(4));
  //console.log(x.join());
  //console.log(x.join('|'));

  //let x = [2, 4, 6, 1, 3, , 4,];
  ////call back function:
  //x.forEach(function (a,i,array) { console.log(a + " at index "+i +'. Its array is ' + array) });  //a will not be null

  //let x = [
  //  [1, 3, 5, 2, ],
  //  [3, 2, 4, 5, 7, 8],
  //];

  //for (let i = 0; i < x.length; i++) {
  //  for (let k = 0; k < x[i].length;k++) {
  //    console.log(i, k,x[i][k]);
  //  };
  //  console.log('~~~~~');
  //}

  //x.forEach(
  //  function (r) {
  //    //console.log(r);
  //    r.forEach(function (col) {
  //      console.log(r, col);
  //    });
  //  });

  //for (let i = 0; i < x.length; i++) {
  //  for (let k = 0; k < x[i].length;k++) {
  //    console.log(i, k, x[i][k]);
  //    if (x[i][k] === 7) { console.log('found' + x[i][k]);break };
  //  };
  //  console.log('~~~~~');
  //}

  ////label a line for break and continue
  //outerLoop: for (let i = 0; i < x.length; i++) {
  //  for (let k = 0; k < x[i].length; k++) {
  //    console.log(i, k, x[i][k]);
  //    if (x[i][k] === 3) {
  //      console.log('found' + x[i][k] +', so jump to outerLoop');
  //      continue outerLoop;  // = break; (except below note) which means break here from this loop and continue from its outer loop if available.
  //      //break;  //it differs 'continue outerloop' - see the below
  //      //break outerLoop;  //just finish/stop outerloop from here
  //    };
  //  };
  //  console.log('~~~~~');  //this code is ignored with continue outerloop but not ignored with break;

  //}

//  //date: Unix Epoch: start from Jan 1 1970
//  var dat = new Date();
//  console.log(dat); //Fri Sep 02 2022 08:37:55 GMT-0600 (Mountain Daylight Time)
//  console.log(Date.now());  //1662129317018, which milliseconds
//  dat = new Date(1999, 2, 1);  //month always 0-based, so it's 19990301
//  console.log(dat); //Mon Mar 01 1999 00:00:00 GMT-0700 (Mountain Standard Time)
//  console.log(new Date(0)); //0 = milliseconds, it shows Wed Dec 31 1969 17:00:00 GMT-0700 (Mountain Standard Time)
//  console.log(new Date(2000, 12)); // 20010101 = 2000 + 13 months

//  let sdate = Date.now();
//  for (let i = 0; i < 1000000; i++) { let k =Math.log(1); };
//  let edate = Date.now();
//  console.log(sdate);  //1662130414939
//  console.log(edate);  //1662130414941
//  console.log(`Elapsed ${edate - sdate}` + ' milliseconds');  //Elapsed 2 milliseconds

  //let d1 = new Date(2000, 0, 1);
  //let d2 = new Date(2000, 0, 3);
  //console.log(d2 - d1); //172800000
  //let oneDayFactor = 1000 * 60 * 60 * 24;
  //console.log(`Days: ${(d2 - d1) / oneDayFactor}`);  //Days: 2

  //console.log(Date.parse('2000 01 02 00:01:01 GMT'));
  //console.log(new Date('2000 01 02 00:01:01 GMT'));
  //console.log(new Date('2000-01-02'));

  //let d1 = new Date(2000, 1, 1, 23, 59, 59); 
  //console.log(d1);//Tue Feb 01 2000 23:59:59 GMT-0700 (Mountain Standard Time)
  //console.log(new Date(Date.UTC(2000, 1, 1, 23, 59, 59))); //Tue Feb 01 2000 16:59:59 GMT-0700 (Mountain Standard Time)

  //d1 = new Date(2000, 1, 3);
  //console.log(d1.getDay());
  //console.log(d1.getMonth());
  //console.log(d1.getTimezoneOffset());  //420: minutes off from UTC
  //console.log(d1.getTimezoneOffset()/60);  //7: hours off from UTC
  //console.log(d1.getFullYear());

  //function p(x, y) {  //= let p=function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}
  //console.log(p(3, 3));
  //let myFunc = p;
  //console.log(myFunc(3, 3));

  //let pow= function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}
  //console.log(pow(3, 3));

  //var x;
  //consolel(x);
  //x = 10;

  //dostuff();  //h - working code
  //function dostuff(){  //call function declaration
  //  console.log('h');
  //};

  //do2();  //Uncaught TypeError: do2 is not a function
  //var do2 = function () {  //call function expression
  //  console.log('h');
  //};

  ////JS function is first class citezien - 6 types of ways of using it
  //// ... as var, as expression, as object, as callback or argument, as array element ....
  //let pizza= function p(x, y) {  //= let p=function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}
  //console.log(pizza(3, 3));

  //function p(x, y) {  //= let p=function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}
  //let coolFuns = [p];
  //console.log(coolFuns);
  //console.log(coolFuns[0](3,3));

  //let mathFuncs = { power: p };
  //console.log(mathFuncs.power(3, 3));
  //p.description = "p's desc property";
  //console.log(p.description);  //p's desc property

  //function callbackExample(x) {
  //  return x(3, 2);
  //};
  //console.log(callbackExample(p)); //9

  //function returnAFunc() {
  //  return p;
  //}
  //console.log(returnAFunc()(2, 3)); //8

  //p.calculated = [];
  //function p(x, y) {  //= let p=function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  p.calculated.push(total);
  //  return total;
  //}
  //p(3, 3);
  //console.log(p.calculated);
  //p(3, 3);
  //console.log(p.calculated);

  ////memorization by storing key-value to improve performance.
  //p.calculated = {};
  //function p(x, y) {  //= let p=function (x, y) {
  //  let inputKeys = x + '^' + y;

  //  if (inputKeys in p.calculated) {  //don't repeat calculations
  //    return p.calculated[inputKeys];
  //  }

  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  p.calculated[inputKeys]=total;
  //  return total;
  //}
  //p(3, 3);
  //console.log(p.calculated); //{3^3: 27}
  //p(3, 3);
  //console.log(p.calculated); //{3^3: 27} - this time without doing calculation

  ////function arguments
  //function p(x, y) {  //= let p=function (x, y) {
  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}

  //console.log(p()); //=1   not pass in arguments
  //console.log( p(2, 2, 3, "r")); //=4   pass more than default arguments

  ////extra parameters
  //function p(x, y = 2, ...extra) {  //y=2: y's default=2
  //  console.log(extra);
  //  if (y == undefined) { y = 2 };  //same as y=2 above
  //  y = typeof y === 'undefined' ? 2:y ;  //same as above

  //  let total = 1;
  //  for (let i = 0; i < y; i++) {
  //    total *= x;
  //  }
  //  return total;
  //}
  //console.log(p(3)); //=9   less than default arguments
  //console.log(p(3, 3, 12, 123));  //extra arguments

  //function x1_extra(x, ...extra) {
  //  let largest = x;
  //  for (let i = 0; i < extra.length; i++) {
  //    if (largest < extra[i]) largest = extra[i];
  //  };
  //  return largest;
  //}
  //console.log(x1_extra(3, 1, 4, 8)); //=8

  ////call function as method
  //let me = {
  //  name: 'Caleb',
  //  outputMe: function () {
  //    console.log(this);
  //    console.log(this.name);
  //  }
  //}
  //me.outputMe(); //{name: 'Caleb', outputMe: ƒ}  -invoke the func as method

  ////invoke the func as func and get window object
  //let me2 = {
  //  name: 'Caleb',
  //  outputMe: outputMe
  //}
  //function outputMe() {
  //  console.log(this);
  //  console.log(this.name);
  //}
  //me2.outputMe(); //{name: 'Caleb', outputMe: ƒ}  -invoke the func as method
  //outputMe();// invoke it as func, we get window object

  ////call function in strict mode
  //function outMeStrict() {
  //  'use strict';
  //  console.log(this);
  //}
  //outMeStrict(); //undefined - function strict mode

  ////call function as constructor 
  //function Person() {  //always captal first letter - coding conversion for constructor
  //  console.log(this);  //Person {} - constructor
  //  this.name = 'the name of this object';
  //}
  //let p1 = new Person(); //pass in implict object
  //console.log(p1);  //Person {} - constructor

  ////apply and call, and  bind for this
  //function dostuff(x,y) {
  //  console.log(x,y);
  //  console.log(this);
  //}
  //dostuff.call("hello", 5, 10);  //5 10   String {'hello'}
  //dostuff.apply("apply", [5, 10]); //String {'apply'} - argument = array for apply
  //let newDoStuff = dostuff.bind("bind", 5, 10); //bind
  //console.log(newDoStuff);  //ƒ dostuff(x,y) {
  //                            //  console.log(x, y);
  //                            //  console.log(this);
  //                            //}
  //newDoStuff(); //5 10  String {'bind'}
  //let me = { name: 'Caleb' };
  //dostuff.call(me, 5, 10); /5 10   {name: 'Caleb'}

  //// arrow function: ()=>expression or x=>expression
  //function f1(x) {
  //  return x * x;
  //}
  //let f1Arrow = x => x * x;
  //console.log(f1Arrow(5));  //25
  //f1Arrow = x => { return x * x }; //with {}
  //console.log(f1Arrow(2));  //4
  //let f2Arrow = () => 4 * 5;
  //console.log(f2Arrow(5));  //20
  //let f3Arrow = (x, y) => {
  //  name: 'f3Arrow';
  //  return x * y;
  //}
  //console.log(f3Arrow(3, 5));
  //console.log(f3Arrow.name);

  ////arrow function vs this
  //let arrow = () => this;
  //function normal() {
  //  return this;
  //}
  //console.log(arrow());  //Window {window: ... this is for sure
  //console.log(normal()); //Window {window: ... this is not for sure

  ////why sure or not sure for this? - see the below
  //let funcs = {
  //  arrow: arrow,
  //  normal: normal,
  //  arrowInsideFuncTest: () => this
  //};
  //console.log(funcs.arrow());   //Window {window: ... - call the function as method and still give us Window object
  //console.log(funcs.normal(funcs.normal));  //{arrow: ƒ, normal: ƒ}  -call the function as method and give us object
  //console.log(funcs.arrowInsideFuncTest());   //Window {window: ...

  //let arrow = () => this;
  //console.log(arrow());
  //let newFunc = arrow.bind("hello");
  //console.log(newFunc());   //Window {window: ... - confirms => function is stable or alway window object for sure

  //function normal() { return this };
  //newFunc =normal.bind("hello");
  //console.log(newFunc());   //String {'hello'}  - not retur window obejct but string object

  ////js debug
  //function p(x) { 
  //  let total = 1;
  //  for (let i = x; i > 1; i--) {
  //    console.log(total); //one of debugging skills here
  //    total *= i;
  //  }
  //  return total;
  //}
  //console.log(p(3));

  //document.getElementById('btn1').onclick = () => {
  //  console.log("Clicked")
  //};

  //try {
  //  wrong;
  //} catch  {
  //  console.log('wrong')
  //} finally {

  //};

  //try {
  //  wrong;
  //} finally {
  //  console.log('wrong')
  //};

  //try {
  //  wrong;
  //} catch (e) {
  //  console.log(e)
  //} finally {
  //  console.log('finally')
  //}

  ////customized errors
  //function equisErr() {
  //  throw {error: 'equis 1'}
  //};

  //try {
  //  equisErr();
  //} catch (e) {
  //  console.log(e);
  //  console.log("Error");
  //} finally {
  //  console.log('finally here')
  //}

  ////constructor function - no return which differ factory function
  //function User() {
  //  console.log(this);
  //  this.name = 'Caleb';
  //  console.log(this);
  //}
  //let me = new User();
  //console.log(me);

  //function User2(name,interests) {
  //  this.name = name;
  //  this.interests = interests;
  //}
  //let me2 = new User2('B');
  //let me3 = new User2('A',['I like fishing','estin']);
  //console.log(me2, me3); //User2 {name: 'B', interests: undefined} 
  //                       //User2 {name: 'A', interests: Array(2)}
  //me2.membership = 'Gold';
  //console.log(me2); //User2 {name: 'B', interests: undefined, membership: 'Gold'}


  ////factory function - not recommended because we have constrcutor function
  //function User3(name, interests) {
  //  let person = {
  //    name: name,
  //    interests: interests
  //  };
  //  return person;
  //}
  //let me4 = new User3('A', ['I like fishing', 'estin']);
  //console.log(me4); //{name: 'A', interests: Array(2)}

  ////inheritance by prototype
  //function User5(name,interests) {
  //  this.name = name;
  //  this.interests = interests;
  //  this.output = function () {
  //    console.log('do func here ' + this.name );
  //  }
  //}
  //let me5 = new User5('A',['I like fishing','estin']);
  //console.log(me5); //User2 {name: 'B', interests: undefined} 
  //me5.output();

  ////User5.prototype.func1 is better than this.output because it saves memory
  //User5.prototype.func1 = function () {
  //  console.log('Do func1 - a better way of creating a function for User5')
  //}
  //me5.func1();

  ////inheritance by prototype: teacher inherits user Object
  //let user = {
  //  active: true
  //};
  //let teacher = {
  //  teaching: ['math', 'science']
  //};
  //Object.setPrototypeOf(teacher, user);//set PrototypeOf of teacher to be User
  //console.log(teacher); // ... [[Prototype]]: Object  active: true ...
  //console.log(teacher.active); //true

  ////inheritance by prototype vs override or an object under different layers of PrototypeOf
  //let user = {
  //  active: true
  //};
  //let student = {
  //  major: 'english'
  //};
  //let teacher = {
  //  teaching: ['math', 'science']
  //};
  //Object.setPrototypeOf(teacher, user);//set PrototypeOf of teacher to be User
  //console.log(teacher); // ... [[Prototype]]: Object  active: true ...
  //console.log(teacher.active); //true
  //Object.setPrototypeOf(student, user);
  //console.log(student.active); //true

  //student.active = false;  //this active is set directly under student object or not changes the active of its user PrototypeOf.
  //console.log(teacher.active); //true
  //console.log(student.active); //false - first search active under student object, then user's active if not found, and the last try to find active under the student's PrototypeOf

  ////instance property vs prototype property
  //let user = {
  //  active: true,
  //  //the below is a common format for a idName. First, find idName directly under the final object. Second, under PrototypeOf of the inherited object. Last, under PrototyOf the final object
  //  finalName: function () { return this.idName +' from this.idName of user Func finalName.'}
  //};
  //let student = {
  //  idName:'student name',
  //  major: 'english'
  //};
  //let teacher = {
  //  idName:'Caleb Curry',
  //  teaching: ['math', 'science']
  //};
  //Object.setPrototypeOf(teacher, user);//set PrototypeOf of teacher to be User
  //console.log(teacher); // ... [[Prototype]]: Object  active: true ...
  //console.log(teacher.active); //true
  //Object.setPrototypeOf(student, user);
  //console.log(student.active); //true

  //student.active = false;  //this active is set directly under student object or not changes the active of its user PrototypeOf.
  //console.log(teacher.active); //true
  //console.log(student.active); //false - first search active under student object, then user's active if not found, and the last try to find active under the student's PrototypeOf

  //console.log("teacher ", teacher.finalName());
  //console.log('student ', student.finalName());

  ////polymorphism: change teacher's finalName function
  //  let user = {
  //  active: true,
  //  //the below is a common format for a idName. First, find idName directly under the final object. Second, under PrototypeOf of the inherited object. Last, under PrototyOf the final object
  //  finalName: function () { return this.idName +' from this.idName of user Func finalName.'}
  //};
  //let student = {
  //  idName:'student name',
  //  major: 'english'
  //};
  //let teacher = {
  //  idName:'Caleb Curry',
  //  teaching: ['math', 'science'],
  //  //polymorphism
  //  finalName: function () { return this.idName + ' from this.idName of teacher Func finalName.' }
  //};

  //Object.setPrototypeOf(teacher, user);//set PrototypeOf of teacher to be User
  //Object.setPrototypeOf(student, user);
  //student.active = false;  //this active is set directly under student object or not changes the active of its user PrototypeOf.

  //let members = [teacher, student];
  //members.forEach(function (e) {
  //  console.log(e.finalName());
  //});

  ////search in object
  //console.log('Does teacher has idName property?: ', 'idName' in teacher);  //true
  //console.log('Does teacher has idName property?: ', teacher.idName === undefined);  //false
  //console.log('Does teacher has idName property?: ', teacher.idName !== undefined);  //true

  ////.hasOwnProperty checks the search only directly under object or not check further under prototype
  //console.log('Does teacher has idName property?: ', teacher.hasOwnProperty('idName')); //true
  //console.log('Does teacher has idName active?: ', teacher.hasOwnProperty('active')); //false

  ////list properties of an object
  //let properties = [];
  //for (let prop in teacher) {
  //  properties.push(prop);
  //};
  //console.log(properties);

  ////list properties of an object own
  //let propertiesOwn = [];
  //for (let prop in teacher) {
  //  if(teacher.hasOwnProperty(prop)) propertiesOwn.push(prop);
  //};
  //console.log(propertiesOwn);

  ////-----------------------
  //function User() {
  //  this.active = false;
  //}
  //User.prototype.idName = () => this.idName + ' idName from User.prototype';

  //function Student(name,major){
  //  this.idName = name;
  //  this.major = major;
  //}

  //function Teacher(name,major) {
  //  this.idName = name;
  //  this.teaching =major ;
  //}

  //let s1 = new Student('idName from Student', 'English from Student');
  //let t1 = new Teacher('Caleb Curry', ['math', 'science'])
  //console.log(s1);
  //console.log(t1);

  //Student.prototype = new User();// which can be overrided by the below - polymorphism
  //Student.prototype.idName = () => this.idName + ' modified by Student.prototype.idName';
  //Teacher.prototype = new User();
  //let s2 = new Student('idName from Student', 'English from Student');
  //let t2 = new Teacher('Caleb Curry', ['math', 'science'])
  //console.log(s2);
  //console.log(t2);

  //console.log(t2 instanceof Teacher);
  //console.log(t2 instanceof User);

  //--------------------------


}

////prototype function is transfered to any instance created by object constructor (new xxx())
//function outsideFunc() {
//  return 1 + 1;
//}
//let test = new outsideFunc(); //outsideFunc {}
//if (outsideFunc.prototype === Object.getPrototypeOf(test)) {
//  console.log('Match');
//};

//outsideFunc.prototype.func0 = function () {
//  console.log('func0 from outsideFunc.prototype');
//};
//let test2 = new outsideFunc();



