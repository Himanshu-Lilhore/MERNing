### Short Explanation of `ref` and `useRef`

- **Ref**: In React, a ref is a way to directly access a DOM element or a component instance.
- **useRef**: `useRef` is a React hook that creates a mutable object with a `.current` property that persists throughout the component's lifecycle. This object does not cause re-renders when its value changes.

### Key Points
- **Direct DOM Access**: Refs allow you to bypass React's virtual DOM and directly interact with the DOM.
- **Persistent Value**: The value of a `useRef` object persists across re-renders.
- **No Re-renders**: Updating the `.current` property of a `useRef` object does not trigger a component re-render.

### Small Code Snippet

Here's a simple example demonstrating the use of `useRef` to access a DOM element and update its value without causing re-renders:

```javascript
import React, { useRef } from 'react';

const FocusInput = () => {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Click the button to focus me" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
};

export default FocusInput;
```

### Explanation
1. **Creating a Ref**: `const inputRef = useRef(null);` creates a ref object with an initial value of `null`.
2. **Assigning the Ref**: The `ref` attribute is assigned to the `input` element, linking the ref to this DOM element.
3. **Using the Ref**: The `focusInput` function calls `inputRef.current.focus()`, directly interacting with the DOM to focus the input element when the button is clicked.
4. **No Re-renders**: The `inputRef.current` value is updated without causing the component to re-render.

Yes, it is true that changing the value of a `useRef` does not cause a re-render, unlike state updates managed by `useState` or side effects in `useEffect`.