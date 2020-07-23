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
Let's follow the control flow: repeat() is called and begins to run its for loop, defining i initially as 0, then action()
is called.
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
unless() and then() interrupted the previous control flow to the console.log() by placing an if statement before it ("test").   

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
