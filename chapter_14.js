/*
# DOCUMENT STRUCTURE
  The DOM ( Document Object Model ) is a structure of nested objects, each with properties that contain their tag, their value, their child/parent, etc.
The global binding document gives us access to these objects.  document's documentElement property refers to the object represented by the <HTML> tag.
document.documentElement in turn has the properties head and body.
*/

/*
# TREES
  Tree structures cannot be circular, has no cycles, it is branching, has a clear root...like a tree.
In the case of the DOM the root is document.documentElement, the <HTML> object.
All objects within the html object are descendants of document.documentElement. Objects in an HTML document are called nodes.  They can be of many types:
element, text, comment, etc.  To figure out a nodes type, access its nodeType property.
*/

/*
Let's walk through the control flow of this function.
If the node given to talksAbout() is an ELEMENT_NODE we want to loop through its children, asking if they are element or text nodes.
If they are a text node we want to see if they contain "string".
first we check to see if we are dealing with an ELEMENT_NODE, if we are, we enter a for loop
that contains an if statement that recursively calls talksAbout on every child of document.body.  Keep in mind talksAbout() returns a boolean,
so if this version of talksAbout() returns true, control flow will continue with the final function return being true.
In this case let's see what the first recursive call to talksAbout() returns.
The first child of document.body is not an ELEMENT_NODE so control goes to the else if statement, and it is a TEXT_NODE,
so now we extract that text node's nodeValue, or text and see if it includes the given string. If so, it will return a positive integer and will resolve as true.
However this is not the case with document.body's first child node, so we jump back to the if statement in the for loop and skip over it and continue with the 2nd
iteration of our for loop with the 2nd child of our original node. If we ever satisfy the if statement in the for loop, the final return will be true, if we iterate
through all the children whithout ever tripping the if statement, we have a final return of 'false'
*/

function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

console.log(talksAbout(document.body, "book"));
// → true

/*
images is an array like structure full of any <img> tag that occurs in the body
We loop through it starting from the end, because getElementsByTagName is live, meaning it will continutally update how many <img>'s are in it.
And since we are replaceing <img> with a textNode, that list will be shrinking.  If we implemented a standard for loop, and started i at 0,
we would replace the image of a cat with the text of cat, and the img list would be down to 1, but i would also be 1 so we would never get to
iterate over the "Hat" image.  If we start the loop from the last item in the list, we first replace Hat, and then i equals 0, we do one more
iteration and then we are done.  Basically we don't want our qualifying part of the for loop to keep changing.
*/

<p>The <img src="img/cat.png" alt="Cat"> in the
  <img src="img/hat.png" alt="Hat">.</p>

<p><button onclick="replaceImages()">Replace</button></p>

<script>
  function replaceImages() {
    let images = document.body.getElementsByTagName("img");
    for (let i = images.length - 1; i >= 0; i--) {
      let image = images[i];
      if (image.alt) {
        let text = document.createTextNode(image.alt);
        image.parentNode.replaceChild(text, image);
      }
    }
  }
</script>
