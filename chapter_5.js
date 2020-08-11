/*
This is an example of a function creating another function and also an example of closure.
In the scope of the function greaterThan10, n = 10, but in the scope of the function
greaterThan1, n = 1.  The local binding n is created anew for every call to greaterThan.
The ability to reference specific local bindings from an enclosing scope (greaterThan) is called closure.
The function that references that local binding is called a closure, in this case
greaterThan10 or greaterThan1
*/

function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
let greaterThan1 = greaterThan(1);
console.log(greaterThan1(2));
// → true

/*
The take-away from the noisy example is that you can chain functions and function calls together.
Function noisy takes a function as an argument, the noisy function then calls the function it was
given as an argument with an argument of its own (args).  This brings us to chaining function calls.
noisy(Math.min)(3,2,1) calls the noisy function with the argument Math.min, and then in turn calls
the Math.min with the argument 3,2,1 (which becomes an array thanks to the spread operator).
I personlly think the console.logs in this example are confusing and do not add to the understanding
of the concept
*/

function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

/*
Here is a function exactly like the one above except it has 2 nested functions instead of 1, the first being
printToConsole, the second printy.  The nesting of functions and therefore function calls can go on for as
long as you want.
*/

function nestedFunction(f) {
  return x => {
    return f(x);
  };
}
function printToConsole(x) {
  return y => {
    return x(y);
  };
}
function printy(y) {
  for (let i = 0; i < 5; i++) {
    console.log(y);
  }
}

nestedFunction(printToConsole)(printy)("foo bar");
// → "foo bar"
// → "foo bar"
// → "foo bar"
// → "foo bar"
// → "foo bar"

/*
The function repeat would ordinarily repeat an action n times (3 in this example), but then why are there only two outputs?
Ask yourself, how would I define what the variable test refers to in unless()? Although it seems the place for a function,
in this example it is NOT.  It's just a snippet of code, a logial expression containing a variable that resolves to either
true or false.
Let's follow the control flow: repeat() is called and begins to run its for loop, defining i initially as 0, then action() is called.
The function action(), being within the scope of repeat(), has access to any value defined in repeat(). Any of those values
could be passed to action() as an argument, in this example i (the iterator) is passed as an argument to action().
By calling action() with an arg of i, the function that the variable "action" points to must now be designed to take
in a parameter if it wishes access to it.
action() begins by calling unless(). Since unless() is within the scope of action(), unless() can use any value declared in action()...
this includes any args/params passed to action()
unless() begins with an if statement that only if satisfied will run then(), in this case the console.log
Where are we now? ...STILL IN THE repeat() FOR LOOP, we iterate i, call action() and it all starts over...
assuming n is greater than 1!
To answer the first line of this comment, there are only two outputs because the console.log() was nested inside of unless(), inside of then().
unless() and then() interrupted the previous control flow to the console.log() by placing an if statement before ("test").
*/

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

function unless(test, then) {
  // will only run then() if the test fails
  if (!test) then();
}

repeat(3, i => {
  unless(i % 2 == 1, () => {
    console.log(i, "is even");
  });
});
// → 0 is even
// → 2 is even

// rewritten without arrow function
repeat(3, function(i) {
  unless(i % 2 == 1, () => {
    console.log(i, "is even");
  });
});

/*
The standard function reduce() takes up to two arguments, its first being an arrow function that itself takes two
arguments. The first is an accumulator, this value will interact in some fashion with every element of the array that reduce() is called upon.
How the accumulator interacts with each element of the array is defined the body of the arrow function.
The 2nd argument of the arrow function represents the current element of the array that the accumulator is interacting with.
This current element will iterate over every element of the array that reduce is being called upon.
The 2nd/last argument of reduce() sets the accumulator's starting value, if this argument is not given
the accumulator's default starting value will be the array's first element.
 */

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

/*
In this example script.ranges is an array filled with arrays. [ [100,200],[500,600],[1000,2000] ]
The accumulator is represented by the variabl count, and based on the last argument given to reduce(),
it is initiated with the value of 0.
The current value of the array being reduced, is represented by [from, to], an array destructured
into its two elements ( the lower and upper bound of the unicode range )
For each element of script.ranges the difference of to - from is added to count.
*/
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

/*
What is the return of characterCount()?
a number that represents the amount of characters in a language
If we wanted to find out which language had the highest number of characters, we would have to run
characterCount() on all of them and then compare the results, looking for the highest number.
This is what the example below does.
Since a 2nd arg to reduce is NOT given, the default start value of a is the first element of the array
we are reducing(SCRIPTS), so an object that looks like this:

{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}

SCRIPTS.reduce() will be iterating through objects like the one above and calling characterCount()
with each of them as the argument.  For each iteration of reduce, its return will equal the new accumulator.
In this example of reduce, the accumulator represents the language with the largest characterCount we have seen
so far.  If the current language that it is being compared to has more characters, the accumulator will become
THAT language, if not the accumulator will remain the same.
Although languages are compared on characterCount(), the return is a language object like the one above.
*/

console.log(
  SCRIPTS.reduce((a, b) => {
    // if language a has more chars return a as the accumulator, if language b has more, return b as the accumulator
    return characterCount(a) < characterCount(b) ? b : a;
  })
);
// → {name: "Han", …}

/*
filter produces an array with just script objects whose 'living' property points to true
map produces an array the same size as the filtered array, but modifies each element by invoking its year property
so after filter and map, we have an array of numbers that correspond to the years of living languages
*/
console.log(
  Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year)))
);
// → 1165
console.log(
  Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year)))
);
// → 204
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

/*
Using a function within a fuction is a sign of a higher order function, but it is also a good technique
for impoving a function's composability, or readability.  Methods like .filter(), .map(), .reduce(), .some()
are all great tools for doing more in less confusing ways. While they may be more taxing on the computer thanks
simple loops and counters that deal with just numbers, they may be worth the readability they provide.
A program can only be as complex as one you can understand.
*/

/*
characterScript takes a single character code as an argument.  Knowing that each script object has a property called 'ranges', containing
 an array of 2 element long arrays(from, to) we have to ask the question, does the character code given as an argument fall within
any of the 2 element arrays of the script objects being looped through?
This example achieves this through the standard function some()
some() returns a boolean and is therefore useful in if statements, it will return 'true' if at least one element of the array it is being
called upon satisfies its test case and returns 'true'. It will return 'false' only if none of the elements satisfy its test case.
In this example the argument given to some() is a destructured array, with the variables 'from' and 'to', representing the 2 elements
in the sub arrays of the ranges array. As soon as any script's 'from' and 'to' satisfy some()'s test, some() will return 'true',
if 0 script objects return true, some() will return false. some() is performed on each script object, until one returns true...
one 'true' is all some() needs to resolve as 'true', it will then return the script object that satisfied the if statement.
*/
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}

/*
-The function textScripts expects a string of text, textScripts() identifies the script.name of each character in the text string
and calculates each script.name's percentage
textScripts() is a higher order function, so it calls functions within it's body (some of which are higher order functions themselves)
those inner functions include:

-characterScript() takes in a character code, and returns the script object it belongs to.

-countBy(), first argument is an iterable object ( string, array, etc, any object with an iterable property ),
second argument, groupName, represents a function that expects an element of the first argument (iterable object).
In this case: groupName() in textScripts() contains characterScript().
Let's talk about the function that groupName represents in this example.
It is written as an arrow callback function in the parameter declaration parentheses of countBy(). It takes the the argument that it
expects ( an element of the iterable object represented by 'items' ), char in this case, and promptly passes it to
characterScript(), equaling its return to a variable called 'script'. More exactly, the arrow function passes the unicode
translation of char to characterScript(), because that is what it expects...
it is going to check to see which ranges array the code falls into ... [from, to] remember!? and return the script object,
BUT groupName doesn't want the WHOLE script object that a certain character belongs to, it just wants the name,
so the last line of the arrow function returns script.name, or 'none' if 'script' equals null.
the arrow function that represents groupName is now done, BUT countBy is NOT!
We have just returned a value for the variable 'name', the next line of countBy() defines the variable 'known'
'known' is either a positive integer or -1, findIndex() will either return a positive integer, meaning it has found
an element that satisfies its condition and has returned its index, or -1 if none of the elements satisfty the condition.
In the case of countBy, a summary of 'know':
If findIndex() returns -1, push {name: name, count: 1} into counts.
Just name is used in the example because if you put just a variable in to an object, a tuple will be made. "variableName": "variableValue"
If 'know' does not come back as -1, it is because an object with the same name property already exists in counts.  In order
to increase the count of that specific object we write count[known].count++
This snippet of code finds the object at index 'known' in counts and then reads its count property and adds 1 to it.
countBy() returns an array of objects, THEEEN it's done.
Control then shifts to .filter, which selects only the objects where name does not equal 'none', so 'scripts', the first
variable declared in textScripts is now finally defined.  It is an array of objects that look like this:
[{name: 'Han', count: 3}, {...}, {...}]
the arg for filter is worth looking at, it is a destructured object, filter(({name}) => name != "none"),
{name} looks at each element of 'counts' for that element's 'name' property and the value it points to.
Any character that did not return a script/belong to any known script, is not included in this list.
'scripts' is then reduced in order to find the total number of chars, we want to add all of the objects 'count' properties
together. This gives us the total number of chars for which we have found their mother script.
For the last step, .map is run on 'scripts'. With name and count as variables from each destructured object of 'scripts'
a presntational line of string interpolation is composed along with the 'total' variable to calculate the percent each
language makes up of the text.
*/

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic

/*
Exercise #1
  In order to add two arrays into one it's a simple concatination, with arrayA.concat(arrayB)
  Doing with more than two is where reduce comes in handy.  a, the accumulator can concatinate each following array
  one at a time, so it's always as easy as our first example a.concat(b), the difference is that a is a snowball, assimilating
  b everytime.  The first is written with brackets and returns, the second example is only allowed if the code fits on one line.
*/

console.log(
  arrays.reduce((a, b) => {
    return a.concat(b);
  })
);

console.log(arrays.reduce((a, b) => a.concat(b)));

// Exercise #2 recursive solution
function loop(value, test, update, body) {
  if (test(value)) {
    body(value);
    value = update(value);
    loop(value, test, update, body);
  } else return;
}
// iterative solution
function loop(value, test, update, body) {
  for (let i = value; test(i); i = update(i)) {
    body(i);
  }
}
