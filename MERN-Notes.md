# Javascript basics

```javascript
btn.textContent = i
// is better than 
btn.setAttribute("textContent", i)
```
```javascript
location.reload() // To reload the page
```


### Avoiding innerHTML for Appending Child Elements
Do not use `innerHTML` to append a child element to an existing element because:
When you use the `innerHTML` property to add an `h1` element to the `div`, 
it destroys all the existing content inside the `div`, 
including any event listeners attached to its child elements, and then recreates them with the new content.
So use `appendChild()` instead.


### Inserting new Element before/after a particualr element
Using `document.body.insertBefore(btn1, div1)`, we are able to insert `btn1` just before `div1` element.
There is no `insertAfter` method. To insert after an element, we can use:
```javascript
document.body.insertBefore(btn1, div1.nextSibling);
```


### Adding Classes to an Element
Two ways to add classes to an element:
```javascript
newChild.setAttribute('class', 'by-append');
newChild.classList.add('by-append');  // better
```
The second method is better because you can provide any number of comma-separated classes to add to the element instead of overwriting the whole class attribute. And classList can also just remove the elements :
```javascript
newChild.classList.remove('by-append')
```


### Use anonymous function while dynamically calling a function
```javascript
taskCompleteBtn.addEventListener('click', removeTask(parentDiv))
taskCompleteBtn.addEventListener('click', ()=>{removeTask(parentDiv)})
```
First line wouldn't work (as intended) because even though we are just telling the system to call that function on click because we have give an argument to it, the system will execute it on compile time and put it's executed value there. That why if we are passing an argument to a funtion when it is going to be dynamically used, then always wrap that dynamic function in an anonymous function.


### Navigate to parent, remove child
```javascript
let parentIdentifier = childIdentifier.parentNode    // get parent
parentIdentifier.removeChild(childIdentifier)    // remove child
```


### input tag
`input` tag can be used to have a textfield in html. To get or set it, we use `.value` property :
```html
<input id='taskNameFld' class='taskHandler'  placeholder='Enter a task...'>
```
```javascript
let taskNameFld = document.getElementById("taskNameFld")
let taskName = taskNameFld.value
taskNameFld.value = 'setting the value'
```


### .value VS .textContent
If the goal is to retrieve user input from an input field, use the `.value` property, and if you want to work with the visible text content of an element, use `.textContent`.


### center elements
```css
justify-content: space-between;  /* to horizontally keep the elements at same distance */
justify-content: center;  /* to horizontally keep all the elements clumped at center of parent */
align-items: center;   /* align vertically at center */
```


### Most commonly used event listeners :
- click - when the element clicked
- dblclick - when the element double clicked
- mouseenter - when the mouse point enter to the element
- mouseleave - when the mouse pointer leave the element
- mousemove - when the mouse pointer move on the element
- mouseover - when the mouse pointer move on the element
- mouseout -when the mouse pointer out from the element
- input -when value enter to input field
- change -when value change on input field
- blur -when the element is not focused
- keydown - when a key is down
- keyup - when a key is up
- keypress - when we press any key
- onload - when the browser has finished loading a page


### e.target.value
Refer to this html code
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <h1>Data Binding using input or change event</h1>

    <input type="text" placeholder="say something" />
    <p></p>

    <script>
      const input = document.querySelector('input')
      const p = document.querySelector('p')

      input.addEventListener('input', e => {
        p.textContent = e.target.value
      })
    </script>
  </body>
</html>
```
In the given code, e.target.value refers to the value of the input element. The **e is an event object** that is passed to the event handler function when the event is triggered. The target property of the event object refers to the element that triggered the event, which in this case is the input element.


### Parse .json files using :
```javascript
async function fetchData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}
```


### Using async functions with synchronous code
If you are writing a synchronous js script and want to call an async function inbetween, then you'll need to use promises on all the lines which come after that call, like :

```javascript
// want to do this :
fetchData()   // async function called
showAll()     // sync funciton called

// The above sequence of calls won't work properly because fetchData is async so it'll start running in the background and pass the execution to next lines and showAll will be called, and if showAll depends on the fetchData results then it'll give wrong outputs, so to resolve this issue we can do this :
async function fetchData() {
  const response = await fetch('../data/countries_data.json');
  data = await response.json();
  showAll();
}
// Here we called showAll function directly into the definition of fetchData itself
```

>**So when you are having async function calls in the code, instead of calling them inbetween the synchronous code write all the script inside the definition of async function definition.**

```javascript
// Same definition can also be written like this using promises:
async function fetchData() {
  fetch('../data/countries_data.json')
  .then(response => response.json())
  .then(parsedData => {
      data = parsedData;
      showAll();
  })
  .catch(error => {
      console.error('Error fetching JSON:', error);
  });
}
```


### Timers and Delays (setTimeout, setInterval) behaviour in async vs sync code :
The timers and delays behave asynchronously when they are called inside async function, they won't pause/affect the functionality of the part of code after them, but in sync function they will pause/affect the functionality of the part after.
> Important thing to note here is, if you call a synchronous function within an async function it will act async only, because it's part of async now.

### CSS border
When using the border property, you need to specify the border style, width, and color. If any of these values are missing, the border might not be displayed as expected.





# CSS

- Following a tutorial based on [Chris Courses](https://chriscourses.com/courses/css/videos/position-absolute).
- Access the Figma design file [here](https://www.figma.com/file/LJ8KC40jSPGR4rgEim2qYC/Chris-Courses---CSS?type=design&node-id=1-2&mode=design&t=vT918XyuxkNa4SHE-0).

## Display properties :
```CSS
.block{
  display: block;  
  /* element takes up full width of the parent container */
}
.inline{
  display: inline;
  /* element takes up only the space it needs, and things line margin can't be used with inline display property */
}
.inline-block{
  display: inline-block;
  /* same as inline but here we can use things like margin */
}
.hidden{
  display: none;
  /* hides the element from the page */
}
.flex{
  display: flex;
  /* explained below */
}
```
### Display : flex
- When applied to the parent, it treats the parent container as a box and flex property is applied to all the immediate children.
- Whatever display properties the child element might have, applying flex to the parent overwrites them.
- By default flex will give them inline display
- flex unlocks a few sub-flex properties like justify-context, align-items  which helps align the child elements, but these properties are also applied to parent only to see the affect in behaviour of children.  
(see below how we use justify-between class along with flex class)  
Read more here : [CSS tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
```CSS
.flex{
  display:flex;
}
.justify-between{
  justify-content: space-between;
  /* a sub-flex property, which helps align the elements horizontally within the parent container */
}
.justify-center{
  justify-content: center;
}
.items-center{
  align-items: center;
  /* another sub-flex property, it's used to align all the children vertically with respect to the parent container */
}
.flex-wrap{
  flex-wrap : wrap;
  /* another sub-flex property, it helps when we reduce the size of screen and child element
     need to drop down to next line in order to not have an horizontal scroll view */
}
```

## Margin & Padding 
Three ways to write margin/padding properties :
  1. Globally
    margin : 8px; --- sets top, bottom, left, right  all to 8px.
  2. Individually
    padding-top : 15px;
    padding-bottom : 12px;
    padding-right : 9px;
    padding-left : 7px;
  3. Together
    margin : 16px 7px --- sets top & botton to 16px, and sets left & right to 7px
    padding : 16px 12px 7px 9px --- (clockwise from top) top 16, right 12, bottom 7, left 9

> Also a NOTE to remember : If you include multiple classses in a tag with clashing properties, the bottom most written class properties will overwrite the properties from classes above.
```css
.m-8{
  margin: 8px;
  /* margin : the gap between border of element and adjacent element. Interaction with marginalized space has nothing to do with element itself */
  /* sets top bottom left right margin to 8px */
}
.p-8{
  padding: 8px;
  /* padding : the gap between border of element and text within. If you click on padded space, its considered as interaction with that element */
  /* sets top bottom left right padding to 8px */
}
.py-16{
  padding-top: 16px;
  padding-bottom: 16px;
  /* setting y axis paddings to 16px */
}
```


## Position
1. Position : **relative**  
  When you set position: relative; on an element, it remains within the normal document flow, and its position is determined relative to where it would have been if it were not positioned. In other words, it respects the space it would have occupied in the document flow.  
  You can use the top, right, bottom, and left properties to offset the element from its normal position. These offsets are applied relative to the element's initial position. 

2. Position : **absolute**  
  When you set position: absolute; on an element, it is taken out of the normal document flow, and its position is determined relative to its nearest positioned ancestor (an ancestor with a position value other than static, which is the default).  
  If there is no positioned ancestor, it is positioned relative to the initial containing block (usually the viewport).  

Also, in relative there's no relevance with the parent container, but the absolute positioning depends on the parent, it will find the nearest ancester having a non static position and be absolute with respect to that, while the relative is just relative change with respect to the original position of the element in the original flow.  
Having said that, two element might need to be in relative positioning to perform z axis operations of hiding behind each other.
```css
.z-10{
  z-index: 10;
  /* z axis defines where the object lies from our perspective as a viewer. 
  The greater the z index the closer it is to the viewer 
  Also, z-index relies on position relative to work.*/
}
```


### Other commonly used properties :
```CSS
.no-underline{
  text-decoration: none;
  /* for no underline */
}
.font-bold{
  font-weight: bold;
  /* make sure you download the bold version of that font too otherwise on no find the bold version of that font, the system will give the bold of default font */
}
.uppercase{
  text-transform: uppercase;
}
.width-full{
  width: 100%;  /* Maintains the screen to width ratio of the element when resized */
}
.object-cover{
  object-fit: cover; /* This maintains the aspect ratio of the element even when we resize the page */
}
.mx-auto{
  margin-left:auto;
  margin-right:auto;
  /* One of the important methods while automatically gives certain margin to the element which centers it relative the to border or adjacent elements */
}
```
>  span tag serves no purpose other than enclosing some element within them which help style that element or apply js to it. Same for nav, section, header tags (they just show which of the website this code is referring to).  


## Media query
Have to include this meta tag in head to let system adjust to different display sizes implemented using media query :  
`<meta name="viewport" content="width=device-width, initial-scale=1">`  
```css
@media (min-width:600px){
  .bg-blue{
    background-color: blue;
  }
}
/* This is how we used media query. And in this example the system will set the background color (of an element containing bg-blue class) as blue when the width of window exceeds 600px */
```
> Big thing to note here is, whenever we include both class and style attribute in a tag, the style attribute will override all the properties set by classes. So we have to keep conflicting properties in mind whenever we have both these attributes in use.

# Tailwind CSS
(Continuing in the same project)

- Tailwind is a library of huge number of CSS classes. 
- Those classes follow atomic approach i.e. every class only have one property and that class' name represent that property.
- Tailwind provides us with thousands of all commonly used classes, which helps write clean code and also reduces a lot of manual labour of creating lots of CSS classes. 
- Also, Tailwind provides us classes with media queries too which help us write programs which can adjust with the display size.
- Tailwind follows a certain naming convension for class names which is very intuitive. But also we don't need to remember name of each and every class to use it, we can search it [here](https://tailwindcss.com/docs/display).
- You can free find icons (by tailwind makers) to include in your project [here](https://heroicons.com).
- To start using Tailwind simply just put this tag in html head
`<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">`

```css
/* Here is an example to see how tailwind helps */
.block{
  display: block;
}
<div class="block">... </div>

/* Instead of making that block class and then using it, we can directly use such simple classes in tailwind.
Because classes like these are already provided */
```
