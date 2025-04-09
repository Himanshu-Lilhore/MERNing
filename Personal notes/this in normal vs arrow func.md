## Behavior of `this` in Normal Functions vs. Arrow Functions

- **Normal (Regular) Functions:**  
  - **Dynamic Context:**  
    - The value of `this` is determined by **how the function is called**.  
    - When invoked as a standalone function (or as a callback), `this` may default to the global object (or `undefined` in strict mode), not the expected instance.
  - **Implication:**  
    - You often need to use `call`, `apply`, or `bind` to explicitly set the correct context when using regular functions, especially when passing them around as callbacks.

- **Arrow Functions:**  
  - **Lexical Scoping:**  
    - Arrow functions do **not** have their own `this`. They inherit `this` from the surrounding (lexical) context where they are defined.  
    - This means that if an arrow function is defined inside a class method, it automatically uses the class instance's `this`.
  - **Implication:**  
    - With arrow functions, you usually don't need to use `call` or `bind` to set the `this` context. They naturally maintain the context of their enclosing scope.
  - **Example Comparison:**  
    - **Regular Function:**  
      ```js
      function regularTask() {
        console.log(this); // Depends on how regularTask is called
      }
      regularTask();  // Might not refer to the desired context
      ```
    - **Arrow Function:**  
      ```js
      const arrowTask = () => {
        console.log(this); // Captures 'this' from the surrounding scope
      };
      arrowTask();  // 'this' is what it was in the enclosing context (e.g., a class instance)
      ```

---

### How This Affects call and bind

- **Using `call` and `bind` with Normal Functions:**  
  - Essential to set the correct `this` because normal functions do not automatically capture the surrounding context.
  - Example: In a task scheduler, if a normal function is passed as a callback, you might need `__taskRunner.call(this)` or `__taskRunner.bind(this)` to maintain the instance context.

- **Using `call` and `bind` with Arrow Functions:**  
  - Generally unnecessary because arrow functions inherently use the `this` from their lexical environment.
  - **Caution:** If you mistakenly execute an arrow function immediately when you meant to pass its reference (for example, in a queue), you might push a Promise or the return value instead of the function itself.
