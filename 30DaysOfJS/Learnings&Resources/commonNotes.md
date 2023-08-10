# GSoC notes

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
someParent.removeChild(someChild)    // remove child
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


