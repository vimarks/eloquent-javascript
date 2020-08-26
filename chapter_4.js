/*
function phi is a javascript function that represents the following formula:

ϕ =	n11n00 − n10n01
    √ n1•n0•n•1n•0

In order to understand function phi, you must be familiar with binary notation:
it is read from right to left and only consisists of 1's and 0's, the right most
digit representing 1, the next 2, next 4, next 8, next 16...etc
so, to calculate the binary number:  1  0  1  0  1   we start on the right,
                                    16  8  4  2  1
if there is a "1" we add the corresponding value, represented below the
binary digit, if there is a "0", we do NOT add the correspoding value.
The example would be added as follows: 16 + 0 + 4 + 0 + 1  = 21
                                        1   0   1   0   1
The 0's and 1's in the formula above represent binary numbers, n11 can be translated to n3, since the binary number 11 is 3
*/

// table is a 4 element array
function phi(table) {
  return (
    /*
    dividend of the formula, the binary numbers represent the occurence of squirrel/event
    and when converted to a decimal number are the index in the frequency table where that
    specific squirrel/event configuration is present
    for example, in the 3rd square of the table we represent 'squirrel: true' by 1 and 'event: false' by 0 ... thus 10, or 2 in decimal notation
    which is also the index it would fall in when the table is converted to an array.
    (table[3] * table[0] - table[2] * table[1])
    */
    // denominator of the formula
    Math.sqrt(
      // n1* represents all occurences in the table(array) where squirrel is true
      (table[2] + table[3]) *
        // n0* represents all occurences in the table(array) where squirrel is false
        (table[0] + table[1]) *
        // n*1 represents all occurences in the table(array) where event is true
        (table[1] + table[3]) *
        // n*0 represents all occurences in the table(array) where event is false
        (table[0] + table[2])
    )
  );
}

/*
function tableFor returns the frequency table for a given event, that table is then used as the argument for
the phi function, above.
*/

function tableFor(event, journal) {
  // declaring our empty frequency table, represented by an array
  let table = [0, 0, 0, 0];
  /*looping through all the entries of JOURNAL, each entry looks something like this:
  {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false}
  */
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i],
      /* index or the index pointer, starts off pointed at 0 or the first square in our frequency table,
    if neither if statement is true, index will remain 0 and table[index] will increase by 1, which makes
    sense since the first square represents entries where the event and squirrel are false.
    */
      index = 0;
    /*
    if only the first if statment is true, meaning that the event is present in the events array of the entry object
    but squirrel is false, index will = 1 and table[1] will increase by 1
    */
    if (entry.events.includes(event)) index += 1;
    /*
    if only the seconds if statement is true, meaning that the event is not present in the events array but squirrel
    is true, index will = 2 and table[2] or the 3rd square of the table, will increase by 1
    */
    if (entry.squirrel) index += 2;
    /*
    lastly if both if statements are true, meaning that the event is present and squirrel is true, index will = 3
    and table[3] or the 4th square of the table, will increase by 1
    */
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]

function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}

for (let entry of JOURNAL) {
  if (
    entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")
  ) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1

function phi([n00, n01, n10, n11]) {
  return (
    (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
  );
}

/*
# DEEP COMPARISON

What could a or b contain?
1) primitive data types (number,string,bigint,boolean,undefined, symbol)
2) custom data types ( arrays, objects, functions) i think for the purposes of this example, we are not expecting a or b to be a function

when comparing primitive dt's "===" compares on type and value, when comparing custom dt's "===" compares on memory location.
If we do not return true after the fist line, we can assume that we are dealing with:
1) two primitive dt's that do not have the same type and value
2) two custom dt's that are not located at the same memory address
3) one primitive dt and one custom dt

we could say that at this point that if either a or b are a primitive dt, they cannot be "===" (return false)
we also have to deal with null... because typof null returns 'object', we have to check to see if either a or b are null.
if either are, they cannot be equal because the only statement that returns true: null === null, was checked for on the previous line.
OK, so now know we are dealing with two objects and we define keysA, keysB
we get their keys into arrays, check their length
loop through one of the key arrays...
check to see if the key your are iterating over is included in the other array, if not... return false
if both arrays DO include a key, take each corresponding value and recursively call deepEqual with them.
and it starts over, what could a or b contain?
if the keys arrays aren't identical || deepEqual comes back false we return false, otherwise true
*/
function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}
