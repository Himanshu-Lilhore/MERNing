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



