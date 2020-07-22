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
Here is a function exactly like the one above except it has 2 nested functions, the first being
printToConsole, the second printy.  The nesting of functions and therefore function calls is
endless
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
