/*
# ENCAPSULATION
  a core concept of complexity management is breaking large complicated structures into small, easy to read, chunks.  Each
  chunk containing code that pertains to a single purpose that is accessed through its interface.
  An interface is the set of bindings and methods that allow external forces to manipulate/use a chunks specific purpose.
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
have access to the method speak, but the type property would be a property that only exists on instances of protoRabbit.
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
The parameters to a constructor function are attributes that all objects in this class will have, but they values they point to may be different.
For example all rabbits have a type, but a different type...therefore type is stored on the individual instances, not on the protoype.
The constructor function also creates with a prototype and returns that object.
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
but for weirdRabbit, because of the 'new' keyword Rabbit creates an instance or child of itself. Inserting itself into that instances prototype property
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
a class declaration, constructor functions may be omited completely..apparently .
*/
let object = new (class {
  getWord() {
    return "hello";
  }
})();
console.log(object.getWord());
// → hello
