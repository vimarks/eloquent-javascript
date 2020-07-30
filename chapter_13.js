/*
  A fundamental tenant of the web is that it is decentralized.  There is no central entity calling all the shots, making all the rules.
This was especially true in the early days of the web. While this allows for many contributors to simultaneously help advance the web
in all sorts of ways, it would be impossible for them all to be working and communicating with one another.  Often times, two teams
could be working on the same project and be effectively using what ever service they provide.  Then others come in contact with
either team, and adopt their technology... but what happens if followers of both camps eventually run into eachother. One way of thinking
would have to be converted to the other's or a backwards compatible layer would have to be built on top of theirs, or...
The web is the camel made by a committe trying to make a horse, too many cooks in the kitchen, etc. The web is can be a confusing
lasagna of protocols and layers that are not always as ingenius or as intuitive as one would hope.
*/

/*
# NETWORKS AND THE INTERNET
  There are understandably a few network protocol layers that regulate how bits of data are transferred around the internet.  The computers
on both ends need to know what the bits are supposed to represent. The meaning of any sequence of bits depends entirely on the kind of thing
those bits are tyring to represent and what mechanism is resposible for encoding/decoding it.
The first layer is HTTP, HyperText Transfer Protocol specifies a model of requests and responses, quite simply one machine
speaking to another. Every request should begin with a line like, GET /index.html HTTP/1.1, specifies the method, the file it wants
and the version of HTTP that it is using.

  Another base protocol for regulating communication on the internet is TCP, Transmission Control Protocol.  A computer must be listening
out for requests from other computers. This computer, the server, must be listening on a specific port (number) for any requests coming
to that specific port by another computer, the client. If these two ingredients are there, the connection is successful
*/

/*
# THE WEB
  The web refers to the protocols and formats that allow users to visit websites in a browser.
Every document on the web is named by a Uniform Resource Locator (URL), that desginates which protocol its using (http://, https://, etc)
The server's address, and lastly a path-string that specifies what exact resource we would like to be sent. ( /13_browser.html )
All addresses point to an IP address, which is a set of random numbers that any machine connected to the internet gets assigned.
When you input a url in the address bar and click enter, first the browser figures out what ip address the address is pointing to,
it then attempts to make an http request to that ip address asking for a specific resource, identified by the last part of the URL
*/

/*
# IN THE SANDBOX
  Browsers limit what a website's javascript can do, they isolate the javascript from your computer and only allow it to modify code
in that webpage's environment.  This is called sandboxing, keeping the code in a sandbox to play, keeping it away from the clean house.  
*/
