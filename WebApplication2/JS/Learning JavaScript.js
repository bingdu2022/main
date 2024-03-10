let btn1 = document.getElementById('btn1');
btn1.disabled = true;

document.getElementById("button").onclick = function () {
  document.getElementById("confirm").innerHTML = "Order placed.";
  document.getElementById("button").style.display = "none";   // remove or hide the Confirm button after clicking on it.
}

// localStorage.setItem saves a variable onto the client's computer when they access a web site.
// usages: 1. do a special logic shown below.
// 2. Persistence: Data stored in localStorage persists across page reloads and even when the browser is closed and reopened.
// 3.Storage Limit: The data size limit for localStorage is larger compared to cookies, typically around 5 MB per domain.
// 4.Simple API: The localStorage API is easy to use, with methods like setItem and getItem for storing and retrieving values.
// Note not used if sensitive or security concerns on the info saved onto a client's computer.

/// Check if the username is already stored in localStorage
var username = localStorage.getItem('username');
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
// note that the alert popup has the checkbox of  "Don't allow localhost:44328 to prompt you again,".
// If you check it, the 'Enter your username:' prompt will never work again whether refreshing or closing the brower/restart the web app unless you clear cashes of the browser.
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

var y_array = 10;
let x_array = 20;

{
  //block
  let z = "30";   // let is block-scoped { } and must be initialized with a value, here z_array is different from the below z_array that is within another { ... }
  const w = 40;    // const is block-scoped { }, must be initialized with a value, and cannot be changed.
  {
    let z = 50;   // here z_array = 50 is different from the outside z_array = "30"
    console.log(z);
  }
  console.log(z + w);  // = 3040 and no errors even if a string + a number

  let myName = 'Bing';
  console.log(myName);
}


let x1 = {   // x1 is defined as an object. Each attribute ends with comma. Inside functions are used as x1.fun() or x1.fun2().
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

let dat0 = new Date();
console.log(dat0.toISOString());  // display a date in string
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
  // the data stored in sessionStorage is only available for the duration of the page session. Once the user closes the tab or window, the data is cleared.
  var input = sessionStorage.getItem('input');
  if (sessionStorage.getItem('input') == null) {
    input = prompt("Input a number:");
    sessionStorage.setItem('input', input);
  };
  console.log("Decimal:", input);
  console.log("Binary:", Number.parseInt(input,2));
  console.log("Octal:", Number.parseInt(input, 8));
  console.log("Hex:", Number.parseInt(input, 16));

  var input2 = sessionStorage.getItem('input2');
  if (input2 == null) {
    input2 = prompt("Input a decimal:");
    sessionStorage.setItem('input2', input2);
  };

  console.log(input2, " in decimal to decimal:", input2);
  console.log(input2 + " in decimal to binary:", input2.toString(2));
  console.log(input2 + " in decimal to octal:", input2.toString(8));
  console.log(input2 + " in decimal to hex:", input2.toString(16));
    
  let x0 = new Number(1234567);
  console.log(x0.toExponential(5));
  console.log("$" + x0.toFixed(2));
  console.log(x0.toLocaleString());
  console.log(typeof (x0.toFixed(2)));

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
  

  let dy = 'Bing';
  console.log(`I\nam ${dy}`);  //\n a line symbol
  let longLine = 'a very long \
second line'; console.log(longLine);
  console.log(dy.length);
  console.log(dy.charCodeAt(2));
  console.log(dy[2]);
  console.log(dy.concat("c1", 'c2'));
  let longS = 'i am very long and have a good child.';
  let search1 = 'good';
  let search2 = 'nothing';
  console.log(search1 + ' vs. ' + search2);
  console.log(longS.includes(search2));
  console.log(longS.includes(search1, 10));  // search starting from the index 10
  console.log(longS.indexOf(search1));  // 26,  alway 0-based, 
  console.log(longS.indexOf(search2));  // -1

  console.log('long'.substring(2, 3));  // n  -includes characters at index 2 (inclusive) but not at index 3 (exclusive).
  console.log('long'.substr(2, 1));
  console.log(' \t\nloNg \t \n'.toUpperCase().trim());  // \t: tab space. trim() method in JavaScript removes leading and trailing whitespaces, including spaces, tabs (\t), and newline characters (\n).
  console.log(' \t\nloNg \t \n'.toUpperCase().trim().length);  
  console.log(' long'.trimLeft());
  console.log(' long '.trimEnd());
  console.log('repeat me\t'.repeat(3)); // repeat me	repeat me	repeat me	
  console.log('code|12'.split('|'));  // array["code", "12"]
  console.log('I*to death'.replace('*', ' '));
  console.log('i am here'.search('am'));
  console.log(' \t\nloNg \t short \t \n'.toUpperCase().replace(/\s/g, ''));  // /\s/g is a regular expression that matches all whitespace characters (\s), and g is a flag that ensures a global search (matches all occurrences)
  console.log(' \t\nloNg \t short \t \n'.toUpperCase().trim());   // =LONG 	 SHORT,  trim() does not remove \t or \n that is not at leading or trailing.

  
  let posi = {
    x: 10,
    y: 20,
    print: function () {
      console.log(`X: ${this.x}, Y: ${this.y}`);  // how to use inside varaiables within an object
    },
    childObject: { leftSide: 'this is left side' }  // an object can nest another object
  }
    console.log(posi);
  let posiRef = posi;
  posiRef.x = 15;    // the value of an object's attribute can be changed
  console.log(posi.x);
  posi.print();

  console.log(posi.childObject.leftSide);

  function print() {
    console.log(`X: ${this.x}, Y: ${this.y}`);
  }
  print();  // you get X: undefined, Y: undefined

  var name = 'a';  // prompt();
  if (name === 'a') {  // 5<>'5' for === identify operator or strict equality for asking for equal in both value and data type
    // == can convert data type underline
    console.log('welcome a!');
  }
  else if (name === 'b') {  // 5<>'5' for === identify operator or strict equality for asking for equal in both value and data type
    // == can convert data type underline
    console.log('welcome b!');
  }
  else {
    console.log('Wrong guess');
  }

  x = -1; // prompt();
  if (x !== 'a') {  // this line = !(x_array=='a')
    console.log('welcome none a')
  }
    else if (x < 2 || x>=10) {
      console.log('you are right - 1<2');
  }

  x = 11; // prompt();
  if (x < 2 || x >= 10) {  // ||= or   &&= and
    console.log(`you are right -${x}<2 or ${x}>=10`);
  }

  name = 'd' // prompt("what is your name?");
  switch (name) {
    case 'a':
    case 'c':
      console.log('welcome a or c');
      break;
    case 'b':
      console.log('welcom b');
      break;
    default:
      console.log("guess wrong");
      break;
  }

  x = 1;
  if (x === 1) console.log('x=1');
  console.log(x === 1 ? `x(${x})=1` : 'x<>1');
  x = 2;
  let y = x === 1 ? `x(${x})=1` : 'x<>1';
  console.log(y);   // 0

  let i = 0;
  while (i < 3) {
    console.log(i);
    i++;  // or i += 1;
  }

  i = 0;
  do {
    console.log(i);
    i++
  } while (i < 3);

  let password;
  do {
    password = 'let me in';  // prompt('what is the passcode?');
  } while (password.toLowerCase() !== "let me in");

  do {
    var password2 = 'let me in';  //  prompt('what is the passcode?');  //var: global or local to entire function regardless of block scope
  } while (password2.toLowerCase() !== "let me in");

  for (i = 10; i < 13;i++) { console.log(i) };  // i is defined outside of for loop

  for (let i = 0; i < 10; i = i + 2) { console.log(i) };   // i can also be defined inside for loop even if there is an outside i defined.

  let list = [1, 3, 5];
  for (i = 0; i <= list.length; i++) { console.log(i) };

  let s = "Search this string in a long one";
  let charToSearch = 'a';
  for (let i = 0; i <= s.length; i++) {
    if (s[i] === charToSearch) {                       // access 'inside' of a string s, we can do s[i] - i here is the index of a letter in the s string.
      console.log(s[i] + " is found at index: " + i);
    }
  }

  //find the first occurance
  let s1 = "Search this string in a long one";
  let charToSearch1 = 'a';
  for (let i = 0; i <= s1.length; i++) {
    if (s1[i] === charToSearch1) {
      console.log(s1[i] + " is found at index: " + i);
      break;
    }
  }

  //Skip something
  let s2 = "Search this string in a long one";
  let charToSearch2 = 'a';
  for (let i = 0; i <= s2.length; i++) {
    if (s2[i] === charToSearch2) {
      continue;
    }
    console.log(s2[i] + " is found at index: " + i);   // undefined is found at index: 32 because '=' is used in 'i <= s2.length' of the for-i loop
  }

  // dynamically add 1 0, 2 1 0, ... to UI (index.html)
  let d = document.getElementById("dest");   // find the place from UI for adding the 1 0, ... and name is as d
  for (let i = 1; i < 5; i++) {
    for (let j = i; j >=0; j--) {   //j--: count down or j=j-1
      //console.log(i, j);
      d.append(j + " ");    // add the things to the d variable
    }
    var br = document.createElement("br");   // create a separator to divide the added info to several lines
    d.appendChild(br);   // add the separator to the end of each line
  }

  let ages = [12, 13, 15];
  ages.length = 10;   //expand ages from 3 to 10
  ages[20] = 30;  //auto expand ages from 3 to 21

  //multi dimention array
  let stuff = [12, 'test', function (x) {console.log('hello')}];
  let grades = [[1, 2], [20, 12]];
  console.log(grades);
  console.log(grades[0][1]);

  let x_array = [];
  x_array[0] = 12;
  x_array[10] = 2;  // x_array of from 1 to 9 are empty
  console.log(x_array);

  let y_array = [1, 2, 4, 5, 6];
  y_array.length = 3;
  console.log(y_array);

  x_array = [1, 3, 5, 3, 5, 6, 7];
  x_array.length = 10; //expands x_array
  for (let i = 0; i < x_array.length; i++) {
    if (x_array[i] !== undefined) {   //undefined means x_array[i]=empty
      console.log(i);
    }
  }

  let found = false;
  let search = 5;
  x = [1, 3, 5, 3, 5, 6, 7];
  for (let i = 0; i < x.length; i++) {
    if (x[i] === search) {
      //found
      console.log(x[i] + ' at ' + i);
      found = true;
    }
  }

  grades = [];
  while (true) {
    let input = prompt("Add a grade");
    if (input === 'q' || input===null) { break;}  //null = Esc key
    grades.push(Number(input));  //assign input to the next empty element
    console.log(grades);
  }

  x_array = [1, 2, 3];
  console.log(x_array);
  x_array.push(5);
  console.log(x_array);
  console.log(x_array.length);
  console.log(x_array.pop() + " at Pop 1");  //remove one from the last
  console.log(x_array.pop() + " at Pop 2");
  console.log(x_array);  // shows x_array=[1,2] after the 2 pops
  x_array.unshift(40); //insert 40 to the first position of x_array and 
  console.log(x_array); // x_array=[40,1,2]
  x_array.shift();   // x_array=[1,2]  // .shift removes the first item of an array
  console.log(x_array);  //x_array=[1,2] ?
  x_array.push(3, 4, 5);
  console.log(x_array);  //x_array=[1,2,3,4,5]
  x_array.splice(2, 3);  //remove 3 elements starting from 2 index
  console.log(x_array);  //x_array=[1,2]
  x_array.splice(1, 0, 7, 8, 9); //insert 7,8,9 from index 1; 0: delete nothing
  console.log(x_array);  //x_array=[1,7,8,9,2]
  x_array.splice(1, 2, 0, 0, 0, 0); //delete 7,8 and insert 0,0,0,0 at index 1
  console.log(x_array); //x_array=[1,0,0,0,0,9,2]

  x_array = [1, 3, 10, 4, 8, 2, 3];
  console.log(x_array);
  x_array.reverse();
  console.log(x_array);
  x_array.sort(); //alphbatic by default
  console.log(x_array);
  x_array.sort(function (a, b) { return a - b });  // sort x_array elements numerically
  console.log(x_array);
  x_array.reverse();
  console.log(x_array);
  x_array.fill(-1, 0, x_array.length); //replace everything with -1 in x_array
  console.log(x_array);

  x_array = [1, 2, 3];
  y_array = [2, 4, 6];
  x_array.concat(y_array);   //  .concat does not change x_array while many like .sort etc change x_array
  console.log(x_array);
  let z_array = x_array.concat(y_array);
  console.log(z_array);
  console.log(z_array.includes(4) + ' at index ' + z_array.indexOf(4));   // .includes(x): check if z_array has a member with a value of x
  console.log(x_array.join());  // 1,2,3 - join members together separated by commma be default
  console.log(x_array.join('|'));  // 1|2|3

  x_array = [2, 4, 6, 1, 3, , 4,];
  //call back function:
  x_array.forEach(function (x, i, array) { console.log(x + " at index " + i + '. Its array is ' + array) });  // skip x with null

  x_array = [
    [1, 3, 5, 2,],
    [3, 2, 4, 5, 7, 8],
  ];

  for (let i = 0; i < x_array.length; i++) {
    for (let k = 0; k < x_array[i].length; k++) {
      console.log(i, k, x_array[i][k]);
    };
    console.log('~~~~~');
  }

  x_array.forEach(
    function (r) {
      //console.log(r);
      r.forEach(function (col) {
        console.log(r, col);   // r = the first array and the second array, and col = each element of each array
      });
    });

  for (let i = 0; i < x_array.length; i++) {
    for (let k = 0; k < x_array[i].length; k++) {
      console.log(i, k, x_array[i][k]);
      if (x_array[i][k] === 7) { console.log('found' + x_array[i][k]); break };
    };
    console.log('~~~~~');
  }


  //label a line for break and continue
  outerLoop: for (let i = 0; i < x_array.length; i++) {
    for (let k = 0; k < x_array[i].length; k++) {
      console.log(i, k, x_array[i][k]);
      if (x_array[i][k] === 3) {
        console.log('found' + x_array[i][k] +', so jump to outerLoop');
        continue outerLoop;  // = break; (except below note) which means break here from this loop and continue from its outer loop if available.
        //break;  //it differs 'continue outerloop' - see the below
        //break outerLoop;  //just finish/stop outerloop from here
      };
    };
    console.log('~~~~~');  //this code is ignored with continue outerloop but not ignored with break;

  }

  // In JavaScript, when you perform arithmetic operations (such as subtraction, addition, or multiplication) with Date objects, the result is represented in milliseconds
  // when you divide the time difference by the number of milliseconds in a day, you get the result in days.

  //date: Unix Epoch: start from Jan 1 1970
  var dat = new Date();
  console.log(dat); // Mon Dec 11 2023 21:07:58 GMT-0700 - the local date when the site is accessed
  console.log(Date.now());  // 1662129317018 or integer like that, which is milliseconds
  dat = new Date(1999, 2, 1);  //month always 0-based, so it's 19990301. In other words, if the second argument is 0, it's Jan month.
  console.log(dat); //Mon Mar 01 1999 00:00:00 GMT-0700 - the local date when the site is accessed
  console.log(new Date(0)); //0 = milliseconds, it shows Wed Dec 31 1969 17:00:00 GMT-0700 - local time
  console.log(new Date(2000, 12)); // 20010101 = 2000 + 13 months

  let sdate = Date.now();
  for (let i = 0; i < 1000000; i++) { let k =Math.log(1); };
  let edate = Date.now();
  console.log(sdate);  //1662130414939
  console.log(edate);  //1662130414941
  console.log(`Elapsed ${edate - sdate}` + ' milliseconds');  //Elapsed 2 milliseconds

  let d1 = new Date(2000, 0, 1);
  let d2 = new Date(2000, 0, 3);
  console.log(d2 - d1); //172800000
  let oneDayFactor = 1000 * 60 * 60 * 24;
  console.log(`Days: ${(d2 - d1) / oneDayFactor}`);  //Days: 2   - dividing gives day unit

  console.log(Date.parse('2000 01 02 00:01:01 GMT'));  // 946771261000
  console.log(new Date('2000 01 02 00:01:01 GMT'));  // Date Sat Jan 01 2000 17:01:01 GMT-0700 (Mountain Standard Time)
  console.log(new Date('2000-01-02'));  // Date Sat Jan 01 2000 17:00:00 GMT-0700 (Mountain Standard Time)

  d1 = new Date(2000, 1, 1, 23, 59, 59); 
  console.log(d1);//Tue Feb 01 2000 23:59:59 GMT-0700 (Mountain Standard Time)
  console.log(new Date(Date.UTC(2000, 1, 1, 23, 59, 59))); //Tue Feb 01 2000 16:59:59 GMT-0700 (Mountain Standard Time)

  d1 = new Date(2000, 1, 3);
  console.log(d1.getDay());   // 4 - The getDay() method in JavaScript's Date object returns the day of the week (from 0 to 6) for a given date, where 0 represents Sunday and 6 represents Saturday.
  console.log(d1.getMonth());
  console.log(d1.getTimezoneOffset());  //420: minutes off from UTC
  console.log(d1.getTimezoneOffset()/60);  //7: hours off from UTC
  console.log(d1.getFullYear());  // 2000

  function p(x, y) {  //= let p=function (x, y) {
    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x;
    }
    return total;
  }
  console.log(p(3, 3));
  let myFunc = p;      // define a function variable
  console.log(myFunc(3, 3));

  let pow= function (x_scope, y) {
    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x_scope;
    }
    return total;
  }
  console.log(pow(3, 3));

  var x_scope;
  console.log(x_scope);
  x_scope = 10;

  dostuff();  // calling a function does not care if the function is located before or after the calling code
  function dostuff(){  // function declaration - hoisting which means the java compiler will move (raise/hoist) it to the beginning of the js file 
    console.log('h');
  };

  //do2();  //if uncomment this line, we get 'Uncaught TypeError: do2 is not a function'
  var do2 = function () {  //call function expression
    console.log('h');  // this line executed because of the below d02();
  };
  do2;  // it does nothing - using a function variable needs the ending ()
  do2();  // do2() is defined in the form of var do2 in the above, so the var function can ONLY be used after it.

  //JS function is the first class citizen - 6 types of ways of using it
  // ... as var, as expression, as object, as callback or argument, as array element ....
  let pizza= function p(x_array, y_array) {  //= let p=function (x_array, y_array) {
    let total = 1;
    for (let i = 0; i < y_array; i++) {
      total *= x_array;
    }
    return total;
  }
  console.log(pizza(3, 3));

  function p2(x_array, y_array) {  //= let p=function (x_array, y_array) {
    let total = 1;
    for (let i = 0; i < y_array; i++) {
      total *= x_array;
    }
    return total;
  }
  let coolFuns = [p2];  // place a function inside an element of an array
  console.log(coolFuns);
  console.log(coolFuns[0](3,3));

  let mathFuncs = { power: p };  //  mathFuncs is an object with a property power, and the value of power is the object referenced by p. This is a common pattern in JavaScript where objects can contain other objects as their properties.
  console.log(mathFuncs.power(3, 3));  // object1.object2(arg1, arg2)
  p.description = "p's desc property";  // dynamically add a property (description) to the p function
  console.log(p.description);  //p's desc property
  console.log(p);  // p object or function is defined on Line 533

  function callbackExample(func1) {
   // Callback functions are commonly used in asynchronous programming. For example, when making an asynchronous request to a server or reading a file,
   // Asynchronous Operations ...
   // the below 3 and 2 are obtained during the above async 
   return func1(3, 2);
  };
  console.log(callbackExample(p)); //9  = call callbackExample which has p function as pass-in parameter

  // Using a function as a parameter to another function, often referred to as a "callback function," is a common pattern in JavaScript
  // 1.Callback functions: Asynchronous Operations:
  //Callback functions are commonly used in asynchronous programming.For example, when making an asynchronous request to a server or reading a file,
  //you might provide a callback function that will be executed once the operation is completed
  function fetchData(callback) {
    // Perform asynchronous operation
    // Once completed, invoke the callback function
    data = "from fetchData callback func."
    callback(data);
  }
  fetchData(function (data) {
    console.log(data);
  });

  // 2.Callback functions: Modularity and Reusability:
  function processArray(array, callback) {
    // Process each element in the array using the provided callback
    array.forEach(callback);
  }
  processArray([1, 2, 3], function (item) {
    console.log("from processArray: ", item * 2);
  });

  // 3.Callback functions: Event Handling: Callback functions are commonly used in event handling.
  // For example, you might provide a callback function to be executed when a button is clicked or when a timer expires.
  document.getElementById('myButton').addEventListener('click', function () {
    console.log('Button clicked!');
  });

  function returnAFunc() {
    return p;
  }
  console.log(returnAFunc()(2, 3)); //8

  //Global Storage: Defining a property outside the function creates a global variable, which is accessible from anywhere in your code. This can be convenient if you need the data to be accessible across different parts of your application.
  p3.calculated = [];  // add an array property, named as calculated, to p3.  Note it's interested that the calculated property is not defined within the function p3.
  function p3(x, y) {  
    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x;
    }
    p3.calculated.push(total);  // push/add total to the calculated property
    return total;
  }
  p3(3, 3);
  console.log(p3.calculated);  // [27]
  p3(3, 3);
  console.log(p3.calculated);  //[ 27, 27]

  //memorization by storing key-value to improve performance.
  p4.calculated = {};  // add an object property, named as calculated, to p3.
  function p4(x, y) {  //= let p=function (x, y) {
    let inputKeys = x + '^' + y;  // create a key to be used as the name of the first object of {} or p4.calculated 

    if (inputKeys in p4.calculated) {  //don't repeat calculations
      return p4.calculated[inputKeys];
    }

    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x;
    }
    p4.calculated[inputKeys] = total;  // define {key1: value1} where key1 = inputKeys and value = total
    return total;
  }
  p4(3, 3);
  console.log(p4.calculated); //{3^3: 27}
  p4(3, 3);
  console.log(p4.calculated); //{3^3: 27} - this time without doing calculation
  p4(2, 3);
  console.log(p4.calculated); //Object { "3^3": 27, "2^3": 8 }

  //function arguments
  function p5(x, y) {  //= let p=function (x, y) {
    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x;
    }
    return total;
  }

  console.log(p5()); //=1   not pass in arguments: for-loop won't be ran due to i < y=null, so return back total = 1
  console.log( p5(2, 2, 3, "r")); //=4   pass more than default arguments - the arguments (3, "r") after the defaults are ignored.

  //extra parameters
  function p6(x, y = 2, ...extra) {  //y=2: y's default=2
    console.log(extra);
    if (y == undefined) { y = 2 };  //same as y=2 above
    y = typeof y === 'undefined' ? 2:y ;  //same as above

    let total = 1;
    for (let i = 0; i < y; i++) {
      total *= x;
    }
    return total;
  }
  console.log(p6(3)); //=9   less than default arguments
  console.log(p6(3, 3, 12, 123));  //extra arguments

  function x1_extra(x, ...extra) {
    let largest = x;
    for (let i = 0; i < extra.length; i++) {
      if (largest < extra[i]) largest = extra[i];
    };
    return largest;
  }
  console.log(x1_extra(3, 1, 4, 8)); //=8

  //call function as method
  let me = {
    name: 'Caleb',
    outputMe: function () {
      console.log(this);
      console.log(this.name);
    }
  }
  me.outputMe(); //{name: 'Caleb', outputMe: ƒ}  -invoke the func as method

  //invoke the func as func and get window object
  let me2 = {
    name: 'Caleb',
    outputMe: outputMe
  }
  function outputMe() {
    console.log(this);    // 'this' refers to the holder of outputMe and it's 'Window https://localhost:44328/'
    console.log(this.name);   // this.name is 'd'
  }
  me2.outputMe(); //{name: 'Caleb', outputMe: ƒ}  -invoke the func as method
  outputMe();// invoke it as func, we get window object

  //call function in strict mode
  function outMeStrict() {
    'use strict';
    console.log(this);
  }
  outMeStrict(); //undefined - function strict mode

  //call function as constructor 
  function Person() {  //always captal first letter - coding convention for constructor
    console.log(this);  //Person {} - constructor
    this.name = 'the name of this object';
  }
  let ps1 = new Person(); //pass in implict object
  console.log(ps1);  //Person {} - constructor

  //apply and call, and  bind for this
  function dostuff(x,y) {
    console.log(x,y);
    console.log(this);
  }
  dostuff.call("hello", 5, 10);  //The call method is used to invoke the function immediately. It sets the 'this' value to the first argument provided ("hello") (or names the function as hello) and passes the subsequent arguments (5, 10) as function arguments.
  dostuff.apply("apply", [5, 10]); //The apply method is similar to call but takes an array of arguments.
  let newDoStuff = dostuff.bind("bind", 5, 10); //The bind method creates a new function with the same body as dostuff but with a fixed 'this' value ("bind") and partially applied arguments (5, 10).
  console.log(newDoStuff);  //ƒ dostuff(x,y) {
                              //  console.log(x, y);
                              //  console.log(this);
                              //}
  newDoStuff(); //5 10  String {'bind'} shown by Lines 752-751

  // why call .bind with 'partially applied arguments' ?
  function add(x, y) {
    return x + y;
  }
  // Using bind to create a new function with 'this' fixed to null and the first argument fixed to 5
  const addFive = add.bind(null, 5);
  //In this example, add.bind(null, 5) creates a new function addFive where the this value is fixed to null,
  //and the first argument x is fixed to 5. When you later invoke addFive(3), it's equivalent to calling the original add function with x set to 5 and y set to 3, resulting in 8.
  console.log(addFive(3)); // Outputs: 8
  // Summary:
  // So, "partially applied arguments" mean that you've set some arguments of a function to specific values, creating a new function with those values fixed.
  //It allows you to create specialized functions based on a more general one by fixing certain parameters


  let me3 = { name: 'Caleb' };
  dostuff.call(me3, 5, 10);   // 5 10   {name: 'Caleb'}

  // arrow function: ()=>expression or x=>expression
  function f1(x) {
    return x * x;
  }
  let f1Arrow = x => x * x;
  console.log(f1Arrow(5));  //25
  f1Arrow = x => { return x * x }; //with {}
  console.log(f1Arrow(2));  //4
  f1Arrow = x => { x * x }; //with {} but missing 'reurn' inside {}
  console.log(f1Arrow(3));  //undefined

  let f2Arrow = () => 4 * 5;
  console.log(f2Arrow(7));  //20 - '7' is ignored since this function doesn't pass in a parameter

  let f3Arrow = (x, y) => {
    name: 'f3Arrow';
    return x * y;
  }
  console.log(f3Arrow(3, 5));
  console.log(f3Arrow.name);

  //arrow function vs this
  let arrow = () => this;

  function normal() {
    return this;
  }
  console.log(arrow());  //Window {window: ... this is for sure
  console.log(normal()); //Window {window: ... this is not for sure and the normal() can have its own 'this'

  //why sure or not sure for this? - see the below
  let funcs = {
    arrow: arrow,
    normal: normal,
    arrowInsideFuncTest: () => this
  };
  console.log(funcs.arrow());   //Window {window: ... - call the function as method and still give us Window object
  console.log(funcs.normal(funcs.normal));  //{arrow: ƒ, normal: ƒ}  -call the function as method and give us object
  console.log(funcs.arrowInsideFuncTest());   //Window {window: ...

  let arrow2 = () => this;
  console.log(arrow2());
  let newFunc = arrow2.bind("hello");
  console.log(newFunc());   //Window {window: ... - confirms => function is stable or alway window object for sure

  function normal1() { return this };
  newFunc1 = normal1.bind("hello");
  console.log(newFunc1());   //String {'hello'}  - not return window obejct but string object

  // summary
  // deference between 'let y = x =>{...}' and 'let y = function x {...}'
  // Arrow functions are concise, lexically scoped, and have a simpler syntax, but have the below disadvantages:
  // Arrow functions (=>) do not have their own 'this' (inherit it from the enclosing scope), own arguments object, own super reference, own name property

  // Arrow function preserves the 'this' value of other object
  // Arrow functions don't have their own this and inherit it from the surrounding scope. This can be useful when you want to preserve the this value in callbacks or when working with asynchronous code.
  const obj = {
    name: 'John',
    greet: function () {
      setTimeout(() => {                       // good for callbacks or when working with asynchronous code
        console.log(`Hello, ${this.name}!`);  // => must be used when this.name is needed in this case.
      }, 1000);
    }
  };
  obj.greet(); // Outputs: Hello, John!

  const obj2 = {
    name: 'John',
    greet: function () {
      setTimeout(function () {
        console.log(`Hello, ${this.name}!`);  // why this.name = undefined or d: // when obj2.greet() is called, the 'this' inside the greet method refers to the obj2 object.
        // However, when the setTimeout callback is executed after 1000 milliseconds, it is no longer called in the context of the obj2 object.
        // Instead, it's executed in the global context (or undefined in strict mode), so this.name inside the setTimeout callback becomes undefined.
      }, 1000);
    }
  };
  obj2.greet(); // Outputs: Hello, undefined or d!

  // to solve the 'undefined' issue of obj2, we can use .bind:
  const obj3 = {
    name: 'John',
    greet: function () {
      setTimeout(function () {
        console.log(`Hello, ${this.name}!`);
      }.bind(this), 1000);  // use .bind to give a name to the function () {..} inside setTimeout.
    }
  };
  obj3.greet(); // Outputs: Hello, John!


  //js debug
  function p01(x) { 
    let total = 1;
    for (let i = x; i > 1; i--) {
      console.log(total); //one of debugging skills here
      total *= i;
    }
    return total;
  }
  console.log(p01(3));

  document.getElementById('btn2').onclick = () => {
    console.log("Clicked")
  };

  try {
    wrong1;
  } catch  {
    console.log('wrong1')
  } finally {

  };

  //try {
  //  wrong2;
  //} finally {               // because here 'catch' is missed, it impacts the next try-catch-finally which does not work as expected, e.g. 'finally' is not displayed in the console
  //  console.log('wrong2')
  //};

  //try {
  //  wrong3;
  //} catch (e) {
  //  console.log(e)    // Outputs: ReferenceError: wrong2 is not defined. Why wrong2 and not wrong3 here? is because the previous try-finally misses catch and JS moves this catch to above.
  //  // As a result, this try-catch-finally seems NOT executed at all.
  //} finally {
  //  console.log('finally')
  //}

  // if uncommentted out the above, Outputs: ReferenceError: wrong2 is not defined and the js file stops and no longer executes the below.

  //customized errors
  function equisErr() {
    throw {error: 'equis 1'}
  };

  try {
    equisErr();
  } catch (e) {
    console.log(e);
    console.log("Error");
  } finally {
    console.log('finally here')
  }

  //constructor function - no return which differ factory function
  function User() {
    console.log(this);  // Object {  }
    this.name = 'Caleb';  
    console.log(this);    // Object { name: "Caleb" }
  }
  let me01 = new User();
  console.log(me01);   // Object { name: "Caleb" }

  function User2(name,interests) {
    this.name = name;
    this.interests = interests;
  }
  let me02 = new User2('B');
  let me03 = new User2('A',['I like fishing','estin']);
  console.log(me02, me03); //User2 {name: 'B', interests: undefined} 
                         //User2 {name: 'A', interests: Array(2)}
  me02.membership = 'Gold';
  console.log(me02); //User2 {name: 'B', interests: undefined, membership: 'Gold'}


  //factory function - not recommended because we have constrcutor function
  function User3(name, interests) {
    let person = {
      name: name,
      interests: interests
    };
    return person;
  }
  let me4 = new User3('A', ['I like fishing', 'estin']);
  console.log(me4); //{name: 'A', interests: Array(2)}

  // Defining the Method Inside the Constructor
  // If the method is specific to each instance and requires access to private variables (like this.name), defining it inside the constructor might be appropriate.
  function User5(name,interests) {
    this.name = name;
    this.interests = interests;
    this.output = function () {
      console.log('do func here ' + this.name );
    }
  }
  let me5 = new User5('A',['I like fishing','estin']);
  console.log(me5); //User5 {name: 'B', interests: undefined} 
  me5.output();

  // Defining the Method by prototype
   // If the method does not depend on private instance variables and can be shared among instances, adding it to the prototype is generally more memory-efficient.
  //User5.prototype.func1 is better than the above this.output because it saves memory
  User5.prototype.func1 = function () {
    console.log('Do func1 - a better way of creating a function for User5')
  }
  me5.func1();


  //inheritance by prototype: teacher inherits user Object
  let user = {
    active: true
  };
  let teacher = {
    teaching: ['math', 'science']
  };
  Object.setPrototypeOf(teacher, user);//set PrototypeOf of teacher to be User: teacher will inherit everything like properties and methods from user.
  console.log(teacher); // ... [[Prototype]]: Object  active: true ...
  console.log(teacher.active); //true

  //inheritance by prototype vs override or an object under different layers of PrototypeOf
  let user2 = {
    active: true
  };
  let student2 = {
    major: 'english'
  };
  let teacher2 = {
    teaching: ['math', 'science']
  };
  Object.setPrototypeOf(teacher2, user2);//set PrototypeOf of teacher to be User
  console.log(teacher2); // ... [[Prototype]]: Object  active: true ...
  console.log(teacher2.active); //true
  Object.setPrototypeOf(student2, user2);
  console.log(student2.active); //true

  student2.active = false;  //this active is set directly under student object or not changes the active of its user PrototypeOf.
  console.log(teacher2.active); //true
  console.log(student2.active); //false - first search active under student object, then user's active if not found, and the last try to find active under the student's PrototypeOf

  //instance property vs prototype property
  let user3 = {
    active: true,
    //the below is a common format for a idName. First, find idName directly under the final object. Second, under PrototypeOf of the inherited object. Last, under PrototyOf the final object
    finalName: function () { return this.idName +' from this.idName of user Func finalName.'}
  };
  let student3 = {
    idName:'student name',
    major: 'english'
  };
  let teacher3 = {
    idName:'Caleb Curry',
    teaching: ['math', 'science']
  };
  Object.setPrototypeOf(teacher3, user3);//set PrototypeOf of teacher to be User
  console.log(teacher3); // ... [[Prototype]]: Object  active: true ...
  console.log(teacher3.active); //true
  Object.setPrototypeOf(student3, user3);
  console.log(student3.active); //true

  student3.active = false;  //this active is set directly under student object or not changes the active of its user PrototypeOf.
  console.log(teacher3.active); //true
  console.log(student3.active); //false - first search active under student object, then user's active if not found, and the last try to find active under the student's PrototypeOf

  console.log("teacher3 ", teacher3.finalName());
  console.log('student3 ', student3.finalName());
  
  //polymorphism: change teacher4's finalName function
    let user4 = {
    active: true,
    //the below is a common format for a idName. First, find idName directly under the final object. Second, under PrototypeOf of the inherited object. Last, under PrototyOf the final object
    finalName: function () { return this.idName +' from this.idName of user4 Func finalName.'}
  };
  let student4 = {
    idName:'student4 name',
    major: 'english'
  };
  let teacher4 = {
    idName:'Caleb Curry',
    teaching: ['math', 'science'],
    //polymorphism
    finalName: function () { return this.idName + ' from this.idName of teacher4 Func finalName.' }
  };

  Object.setPrototypeOf(teacher4, user4);//set PrototypeOf of teacher4 to be user4
  Object.setPrototypeOf(student4, user4);
  student4.active = false;  //this active is set directly under student4 object or not changes the active of its user4 PrototypeOf.

  let members = [teacher4, student4];
  members.forEach(function (x) {
    console.log(x.finalName());
  });

  //search in object
  console.log('Does teacher4 has idName property?: ', 'idName' in teacher4);  //true
  console.log('Does teacher4 has idName property?: ', teacher4.idName === undefined);  //false
  console.log('Does teacher4 has idName property?: ', teacher4.idName !== undefined);  //true

  //.hasOwnProperty checks the search only directly under object or not check further under prototype
  console.log('Does teacher4 has idName property?: ', teacher4.hasOwnProperty('idName')); //true
  console.log('Does teacher4 has idName active?: ', teacher4.hasOwnProperty('active')); //false

  //list properties of an object
  let properties = [];
  for (let prop in teacher4) {
    properties.push(prop);
  };
  console.log(properties);

  //list properties of an object own
  let propertiesOwn = [];
  for (let prop in teacher4) {
    if(teacher4.hasOwnProperty(prop)) propertiesOwn.push(prop);
  };
  console.log(propertiesOwn);

  //-----------------------
  function user5() {
    this.active = false;
  }
  user5.prototype.idName = () => this.idName + ' idName from user5.prototype';

  function student5(name,major){
    this.idName = name;
    this.major = major;
  }

  function teacher5(name,major) {
    this.idName = name;
    this.teaching =major ;
  }

  let s51 = new student5('idName from student5', 'English from student5');
  let t51 = new teacher5('Caleb Curry', ['math', 'science'])
  console.log(s51);  // Object { idName: "idName from student5", major: "English from student5" }
  console.log(t51);  // Object { idName: "Caleb Curry", teaching: (2) […] }

  student5.prototype = new user5();// which can be overrided by the below - polymorphism
  student5.prototype.idName = () => this.idName + ' modified by student5.prototype.idName';
  teacher5.prototype = new user5();
  let s52 = new student5('idName from student5', 'English from student5');
  let t52 = new teacher5('Caleb Curry', ['math', 'science'])
  console.log(s52);  // Object { idName: "idName from student5", major: "English from student5" }
  console.log(t52);  // Object { idName: "Caleb Curry", teaching: (2) […] }

  console.log(t52 instanceof teacher5);  // true
  console.log(t52 instanceof user5);  // true
  console.log(s52 instanceof user5);   // true

  //--------------------------


}

//prototype function is transfered to any instance created by object constructor (new xxx())
function outsideFunc() {
  return 1 + 1;
}
let test01 = new outsideFunc(); //outsideFunc {}
if (outsideFunc.prototype === Object.getPrototypeOf(test01)) {
  console.log('Match');
};

outsideFunc.prototype.func0 = function () {
  console.log('func0 from outsideFunc.prototype');
};
let test02 = new outsideFunc();



