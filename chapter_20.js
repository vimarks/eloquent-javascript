/*
Javascript is rare in that it does not have a built in way to handle inputs and outputs.
node.js and js both use console.log() to output data, but they work in different ways.
In js, console.log outputs to the browser's javascipt console, while node.js
outputs it to the process's standard output stream ( directly to the terminal ).
Pure JS code cannot be run in a terminal without Node.  Node is the terminal "variety" of JS,
while JS is a browser "variety"
*/

/*
The CommonJS module system is built into Node and is required to load any NON-global binding.
So, any downloaded packages, any files that are elsewhere in the project, or even from
built-in modules.
The require keyword tells Node that we are going to import a module of some sort, and must
resolve the string ("./reverse") to an actual file that it can load.
If the string pathname begins with / or ./ or ../ it is resolved relative to the current file's path.
for example if you are currently running tmp/robot/robot.js and you require pathname is "./vincent.js"
it will search "tmp/robot/vincent.js".  If require pathname were "../vincent.js", node would load from
tmp/vincent.js

reverse.js adds a .reverse method to export's interface and can therefore be accessed anywhere in the project
through require.
*/

// main.js
// { reverse } must match the property that is being given to the module through exports
const { reverse } = require("./reverse");
// Index 2 holds the first actual command line argument
let argument = process.argv[2];
console.log(reverse(argument));

// reverse.js
exports.reverse = function(string) {
  return Array.from(string)
    .reverse()
    .join("");
};

/*
Anything that you npm install will be housed in a node_modules directory
npm installs all packages to the current directory, as opposed to a central place, rare but useful

fs is a built-in npm module standing for file system, it exports functions that are useful when working on files and directories.
readFile is a property/method in the fs library. readFile() takes 3 args, the first is the file you wish to read,
the second is the character encoding to be used to decode the characters into a string. And lastly a callback function
that expects to handle either error, or text.
*/

let { readFile } = require("fs");
readFile("file.txt", "utf8", (error, text) => {
  if (error) throw error;
  console.log("The file contains:", text);
});

/*
if a second arg is not given to readFile(), readFile assumes that instead of a string, you want a Buffer object containing the
binary data of the string.  An array of numbers, each one representing a byte of data.
*/
const { readFile } = require("fs");
readFile("file.txt", (error, buffer) => {
  if (error) throw error;
  console.log(
    "The file contained",
    buffer.length,
    "bytes.",
    "The first byte is:",
    buffer[0]
  );
});

/*
for the writeFile fs method, the args are 1. the file, 2. the string to be written to the file, 3. a cb that can handle an error arg.
a utf8 encoding is not needed since we passed in a string.
*/

const { writeFile } = require("fs");
writeFile("graffiti.txt", "Node was here", err => {
  if (err) console.log(`Failed to write file: ${err}`);
  else console.log("File written.");
});

/*
although Node does not have promises,
fs does export a promises object that has most of the same functionality as normal fs, but with promises
so, instead of a cb being passed as the last argumnet to readFile, a .then is tacked on to readFile()
that promise takes a callback handling 'text'.
*/

const { readFile } = require("fs").promises;
readFile("file.txt", "utf8").then(text =>
  console.log("The file contains:", text)
);

// if you do not wish to perform readFile asynchronously, readFileSync is a separate function that can be
// called synchronously.  And therefore does not take a cb or a promise
const { readFileSync } = require("fs");
console.log("The file contains:", readFileSync("file.txt", "utf8"));

/*
The below script starts an http server on your computer!
First the function createServer is required from the built in "http" library module
it takes a cb that expects to handle a request object and a response object.
The request has a url property that holds the URL being requested in the address bar,
the response being what the browser will return to that request,
in this case some "text/html"


*/
const { createServer } = require("http");
let server = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(`
    <h1>Hello!</h1>
    <p>You asked for <code>${request.url}</code></p>`);
  response.end();
});
server.listen(8000);
console.log("Listening! (port 8000)");

const { request } = require("http");
let requestStream = request(
  {
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",
    method: "GET",
    headers: { Accept: "text/html" }
  },
  response => {
    console.log("Server responded with status code", response.statusCode);
  }
);
requestStream.end();
