/*
regular expressions are objects, they can be created using the two methods below
the first is created with the RegExp constructor, the second is written as a literal value by enclosing
the pattern in '/'s
*/

let re1 = new RegExp("abc");
let re2 = /abc/;

/*
certain characters have special meaning in regex (+,.?)
if you wish to have the plain old character show up you must escape the special char with a backslash
*/
let eighteenPlus = /eighteen\+/;

/*
the method test will check for the regex pattern anywhere within the string and return true or false
test is a method of a regex object and takes a string
*/
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false


/*
if any characters enclosed in square brackets match a char of the string
so, if any char of the string is a number , there will be a match
\d is shorthand for "any digit" [0-9]
*/
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
console.log(/\d/.test("in 1992"))
// true

/*
\d	Any digit character
\w	An alphanumeric character (“word character”)
\s	Any whitespace character (space, tab, newline, and similar)
\D	A character that is not a digit
\W	A nonalphanumeric character
\S	A nonwhitespace character
.	  Any character except for newline
*/

/*
any digit OR period character
the period looses its special meaning within the square brackets
*/
[\d.]

/*
another way of saying /[^01]/ is: any character EXCEPT 0 or 1
so if there is a match for any character that is not 0 or 1, test will return true
are there any numbers that are NOT /[^012]/  ?
*/

let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true

/*
putting a plus sign after a symbol means that that symbol can be repeated one or more times
/'\d+'/ will match any string that has one or more number between single quotes
a star after a symbol means that the symbol can be repeated zero or more times
/'\d*'/ will match any string that has two single quotes
*/

console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true

/*
putting a question mark after a regex symbol makes that symbol optional
there will be a match with or without it, but the existence of that symbol won't mess things up
*/

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true

/*
numbers within curyl braces indicate that the preceding symbol must occur a certain number of times
first number indicates the least amount of times, second number indicates the most amount of times
if just one number and a comma "preceding symbol must occur at least x amount of times"
below allows day, month, and hours to be one or two digits long, and requires year to be exactly 4 digits long
*/

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true

/*
characters within parentheses are read as one element
chars within parentheses do NOT loose their special meaning
the first two plus signs refer just to the letter 'o' while the third refers to the entire element within parentheses
the i at the end, outside of the regexp makes the matching pattern case Insensitive.
so there any number of "hoo"s in the string and each 'hoo' can have as many 'o's as you want.

so the match would be if string contains at least one 'boo' with any number of 'o's and at least one 'hoo' with any number of 'o's
putting multiple 'boo's in the string will NOT cause test to come back 'false', /boo/ just needs to occur BEFORE 'hoo'
somewhere in the string.

order matters
*/


let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boooohoooohoohooo"));
// → true


/*
.exec is another method that regexp objects have
it returns an array of strings
the first string is the entire match, each subsequent string corresponds with supexpressions of the regExp object.
the object that is returned by exec has an index property, telling us the index of the first match.
*/

let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

/*
can also be called on a string with .match, which must be a string method
*/
let x = "one two 100".match(/(\d)+/);
console.log(x.index)
// → ["100"]

/*
.exec is a method on the regexp object's interface.
.exec returns an array of strings
the fist string is the entire max of the regEpt object
each subsequent string corresponds to subexpression groupings

the subexpression grouping in this case says : return 0 or more chars that are NOT apostrophes between single quotes
*/

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

/*
the array returned by .exec or .match will hold undefined for any subexpressions that did not match
for any subexpression that matched many times, the array will just hold the last match
*/

console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]

/*
new Data() produces current date and time
you can also pass in numbers to the Date constructor to produce a date object
*/

console.log(new Date());
// → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)

console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

/*
.getTime() returns the miliseconds since 1970 of a Date object
you can also create new Dates from miliseconds
*/

console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

/*
getDate takes a string ('09-23-1986') and extracts the numbers out of it with regExp
we know .exec returns an array with the matches of the subexpressions, so we destructure the array with variable names
we are not interested in the full match, so we ignore it with an underscore
we pass the variables into the Date constructor and get a new bonified JS date object
keep in mind the date constructor counts months from zero
*/

function getDate(string) {
  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

/*
even with d{1,2} a four digit number could be entered and matched on one or two of its digits
in order to prevent that we can add a carrot to signify the beginning of the string
and a dollar sign to signify the end. /^!\d+$/  this regexp object would match a string that starts with an exclamation point
and then has one or more digit until the end.

a word boundary \b will only match if there is a word char on one side and a NON word char on the other.
the beginning of a string and end are considered NON word chars, so    /\bvincent\b/
could be surrounded by digits, spaces, or nothingness...like this: "vincent"
*/

console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("con cat enate"));
// → false

/*
note the space in the regexp object, that represents a space...there are no friendly spaces in regexp
pipe characters act as or operators and are usually used in parentheses in order to limit their scope
*/

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.exec("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

/*
strings have the replace method that normally replaces the first occurence of a pattern with a pattern (2nd arg)
the first occurence of a pattern can be represented by a regexp
adding g after your regexp makes it look for matches globally
chars within square brackets can be thought of as separated by || operators.
*/

console.log("papa".replace("p", "m"));
// → mapa

console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

/*
the 2nd arg can also take subexpressions of the pattern in arg1
this takes the form of a string containing numbers 1- 9 preceded by a dollar sign
each dollarsign number pair correspond to a subexpression (as they appear in the regexp)
so "Liskov" is replaced with $2 or "Barbara" and "Barbara" is replaced by $1
allows subexpressions to replace and be replaced
*/

console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler

/*
replace searches for matches to the regexp, for each match it replaces the value of the 2nd arg
which in this case is a function that accepts the full match as an arg and makes that full match uppercase
then returns it. a function is just a value
*/

let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
            str => str.toUpperCase()));
// → the CIA and FBI

/*
minusOne is implicitly passed (full match, subexpression, subexpression) by the replace method
although it doesn't use the full match arg, it still needs to catch it so that the other args are in the right position.
*/

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
