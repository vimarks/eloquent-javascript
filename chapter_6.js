/*
# ENCAPSULATION
  a core concept of complexity management is breaking large complicated structures into small, easy to read, chunks.  Each
  chunk containing code that pertains to a single purpose that is accessed through its interface.
  An interface is the set of bindings and methods that allow external forces to manipulate/use a chunk's specific purpose.
*/

/*
In this example, the object rabbit is given the property speak, which points to a function.  Properties that point to functions are called methods.
*/
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'

/*
any method on an object's interface has access to 'this', refering to the object who's interface the method is on. It is a parameter that is invisibly
passed to every method.
*/

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'
/*
If you wish to explicitly define this as something other than the object on who's interface the method lies. You can use a function's call method.
Its first argument is the value of 'this', followed by any other parameters.
*/
speak.call({ type: "fancy" }, "Burp!");
// → The hungry rabbit says 'Burp!'
/*
functions create their own scope and would not have access to 'this' if it weren't implicitly passed or explicitly passed through the call method.
Therefore if you define a function within a method you must use an arrow function.  Arrow functions are different, they do not bind their own this,
but instead take the 'this' binding of the scope around them.
below, the map method is used within normalize, but still wishes to have access to the object that was explicitly passed to normalize. Because it
uses an arrow function, map can see and use the binding this.
*/
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 });
// → [0, 0.4, 0.6]

/*
This example illustrates that even if an object does not have a certain property, its prototype may. When trying to access a property/method of an object,
js first checks that object's interface, if not found will then check that object's prototype.  It also illustrates that prototypical structure is baked
into the framework of JS.  All objects, unless stipulated otherwise, inherit from Object.prototype, which has baked in methods, toString() for instance.
You can create your own hierarchy of objects by setting which object is the protype of which.  With Object.create()

*/
let empty = {};
console.log(empty.toString);

// → function toString(){…}
console.log(empty.toString());
// → [object Object]

console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

/*
when creating an object you can specify its prototype, or null if you wish to start from a clean slate.
in this case protoRabbit is the prototype of killerRabbit, so any methods that protoRabbit has, killerRabbit also has.
methods can be defined by just the function name, it is shorthand for, function speak(line).  All objects created with the protoRabbit as their prototype
have access to the method speak, but the type property would be a property that only exists on instances of protoRabbit -
getting set like: this.type = type, in the constructor.  That line of code creates a type property and sets it to the variable type.
*/
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'

/*
in order to make objects that have a shared prototype object you can use a constructor function, see below.
The parameters to a constructor function are attributes that all objects in this class will have, but the values they point to may be different.
For example all rabbits have a type, but a different type...therefore type is stored on the individual instances, not on the protoype.
The constructor function also creates with a prototype, which it gets from the  and returns that object.
*/

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

/*
the following paragraph is worth dissecting.
  "It is important to understand the distinction between the way a prototype is associated with a constructor (through its prototype property)
  and the way objects have a prototype (which can be found with Object.getPrototypeOf). The actual prototype of a constructor is Function.prototype
  since constructors are functions. Its prototype property holds the prototype used for instances created through it."

all functions are objects, right? they are special objects that derive from Function.prototype, and we know that objects can have properties.
There is a property that all functions get...all objects too, from their parent object, called prototype.  By default it points at an empty object that derives from the
great ancestral prototype, Object.protype. When 'new' is placed before a function, that function is treated like a constructor.
A constructor is a function that contains a particular parent object in its prototype property, it creates an object in its image and gives that
individual instance the personal params that were passed to the constructor function.
*/

function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");
/*
Object.getPrototypeOf() accesses the prototype property of whatever is in the parentheses.
in the case of Rabbit, which is just a normal function...it's the baked in prototype
but for weirdRabbit, because of the 'new' keyword Rabbit creates an instance or child of itself. Inserting itself into that instance's prototype property
and giving it the personal attribute value, "weird".
*/
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// → true
/*
 in 2015 es6 introduced class notation, it allows for a class's constructor and methods to all be defined in one place.
 In order to call a class's constructor function, write -  'new' 'class name'  one special thing the constructor keyword tells js to do is
 bind the constructor function with the name of the class.  Within the constructor function, a property can be added to all instances that
 are built through the class. In this case 'type'
 It is within the constructor function that 'this' is bound to the instance, and this.'props' are created.
 */
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

/*
here is the declaring of a class via expression, as opposed to statement.
a class declaration, constructor functions may be omitted completely..apparently .
*/
let object = new (class {
  getWord() {
    return "hello";
  }
})();
console.log(object.getWord());
// → hello

/*
killerRabbit is an instance of the class Rabbit, since Rabbit is automatically set as killerRabbit's prototype, through the constructor's prototype property.
the instance has the same teeth property as its parent.
If killerRabbit is assigned its own teeth property, killerRabbit.teeth = "long, etc", this overides its inherited property.
prototypal inheritance takes care of generic properties, but if there is an instance with an exception, the default property can be replaced
on that specific instance.
*/
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
/*
a method like toString() originates at the top level, Object.prototype and is passed down to its children (Array.prototype, Function.prototype)
but, array requires a different version of the toString() method in order to work on arrays.
Arrays are an exceptional instance of Object.prototype's and require a personal toString() method.
*/
console.log(Array.prototype.toString == Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2

console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
/*
a Map is a data structure baked into JS, newMap = new Map(), the class Map constructor is called with no params, and a Map is returned.
Map has set, get, size and has methods.  Maps are useful because they accept non string data types as keys, can be iterated through, start
completely empty instead of with all prototype of a plain object, as below.
*/
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
console.log(ages.toString());

/*
Polymorphism allows for flexible, dynamic, and reusable code.  It is based on the idea that code 	should know as little as possible about the
object/s it is dealing with. For instance, if a method, findCircumference appears on an object's interface, if you write it to expect a wheel,
its brandname, tire-tread, radius, etc. That method would only work with wheels, but if you write it so that the method knows only what it needs
to know, which in the case of finding circumference is radius, then! That method will work on any object that has a getRadius method on its interface.

The resaon that loops can iterate over many different types of data types (strings, arrays) is because loops are looking for a very particular type
of interface, if an object has that interface...it becomes iterable.
*/

Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
console.log(blackRabbit.toString());
// → a black rabbit

/*
symbols are created through the function Symbol().  They are given a string parameter, but alwasy referred to via evaluating brackets
instead of dot notation.  Property keys of objects can either be strings or symbols.  let sym = Symbol("type") rabbit[sym] = "killerRabbit"
*/

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55

/*
symbols are unique and usable as properties, so they are great for naming default props that you don't want to get in the way of future props.
once a symbol has been created through Symbol() it can be accessed by evaluating its bound variable.
In the example below a symbol bound to 'toStringSymbol' is created, and then set as a property for Array.prototype.
The property points to a function. Now all arrays have access to the function that [toStringSymbol] points to.
*/

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([2, 2, 3, 4, 4][toStringSymbol]());
// → 2 cm of blue yarn

/*
below is an object expression using the already created [toStringSymbol] which points to the above function.
here we place the sybol as a prop into a newly made object, and replace its body with { return "a jute rope"}
...not sure why you can replace the just the body like that.
*/

let stringObject = {
  [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope

/*
The object given to a for/of loop is expeced to ba an iterable, meaning it is expected to have a method under the prop name: [Symbol.iterator]
when [Symbol.iterator]() is called on an iterable object (strings,arrays,maps,sets).
[Symbol.iterator]() is a function that produces an object that has the property "next".
calling "next" returns an object with properties "value" and "done".
"value" point to current value of the iterable.
"done" flag is true when value = undefined, starts off false.                            (iterator)
.next returns with a picture of the future, in order to go there you must have a pointer. pointer = iterable.next

Symbol.iterator returns an object that is able to iterate through the object it was called upon.
this object is a specialzed object: a class
it has an interface with the method .next and attributes "done" and "value"
each instance hase done and value props and a next method that somehow holds the value for the next element.
keep in minde that Symbol.iterator() has access to an array, and is just iterating over an array in the background
in order to create instances of Symbol.iterator() that correspond with the correct array index.
*/

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next())
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

/*
class Matrix is gonna produce matrix instances, 2 dimension representations of matrixes
they have width, height and element attributes. element is a function that expects x and y coordinates and is used to fill in initial values with 'undefined'
if the element param is not altered, by default class Matrix will add an undefined as the value of every x/y coordinate
this could be set as any kind of function one might imagine
*/

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
/*
MatrixIterator taks a Matrix instance as an attribute and has a next method.
the next method, which all iterators have, returns ->  {x: x, y: y, value: this.matrix.get(this.x,this.y), done: true/false}
this class creates an Iterator instance specific to a Matrix instance
then function like for...of will expect calls to the iterable's next() to work.
it expects a certain interface
*/

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }

/*
the code below sets the Symbol.iterator method of Matrix.prototype to return an instance of MatrixIterator(this)
the only reason the for...or loop has access to {x,y,values} is because that is what MatrixIterator returns.
for...of looks for the objects [Symbol.iterator] property, and in this case finds a function that returns a new MatrixIterator(this)
for...of then calls .next of the matrix for as many times it has to before done: true
*/

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

/*
the element param here returns a string displaying current x and y coordinates
for...of access matrix's [Symbol.iterator] property and finds a function that returns a new MatrixIterator
An iterator specific to that instance of matrix
and being an iterator, MatrixIterator has a specific interface that for...of expects and can manipulate...iterate.
*/
  let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}
// → 0 0 value 0,0
// → 1 0 value 1,0
// → 0 1 value 0,1
// → 1 1 value 1,1
}

class Vec {
  constructor(x,y){
  	Object.assign(this, {x,y})
  }
  plus(vec){
    return new Vec(this.x + vec.x, this.y + vec.y)
  }
  minus(vec){
    return new Vec(this.x - vec.x, this.y - vec.y)
  }

  get length(){
    let x = Math.pow(this.x, 2) + Math.pow(this.y, 2)
    return Math.sqrt(x)
  }
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(e => e !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group;
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));




class Group {
	constructor(){
      this.members = []
    }

	add(val){
    	if(!this.has(val)){
      		this.members.push(val)
        }
  	}

	delete(val){
      this.members =  this.members.filter( e => e !== val )
    }

	has(val){

      if(this.members.indexOf(val) < 0) return false
      else return true
    }

  	[Symbol.iterator](){
      return new GroupIterator(this)
    }

	static from(iterable){
      let group = new Group()
      for(let n of iterable){
        group.add(n)
      }

      return group
    }
}

//====================================================

class GroupIterator{
  constructor(group){
    this.group = group
    this.position = 0
  }

  next(){
    if(this.group.members[this.position] === undefined) return {done: true}
    let value = this.group.members[this.position]
    this.position++
    return {value, done: false}
  }

}



for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}


// → a
// → b
// → c


let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(Object.prototype.hasOwnProperty.call(map,"hasOwnProperty"));
// → true
