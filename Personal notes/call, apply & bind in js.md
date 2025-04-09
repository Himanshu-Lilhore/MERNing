## call, apply, and bind

- **`call`:**  
  - **Purpose:** Immediately invokes a function, allowing you to explicitly set its `this` context.  
  - **Usage:** Pass the desired context followed by arguments individually.  
  - **Example:**  
    ```js
    function greet(greeting) {
      console.log(`${greeting}, my name is ${this.name}`);
    }
    const person = { name: "Alice" };
    greet.call(person, "Hello");  // "Hello, my name is Alice"
    ```

- **`apply`:**  
  - **Purpose:** Like `call`, it immediately invokes the function with a specified `this` value.  
  - **Usage:** Pass the desired context followed by the arguments in an array.  
  - **Example:**  
    ```js
    function greet(greeting, punctuation) {
      console.log(`${greeting}, my name is ${this.name}${punctuation}`);
    }
    const person = { name: "Alice" };
    greet.apply(person, ["Hello", "!"]);  // "Hello, my name is Alice!"
    ```
  - **Advantage:** It’s ideal when your arguments are already in an array or when the number of arguments is dynamic.

- **`bind`:**  
  - **Purpose:** Returns a new function with a permanently bound `this` context and optionally preset initial arguments. It does not invoke the function immediately.  
  - **Usage:** Use when you need to delay execution while ensuring the function retains the proper context.  
  - **Example:**  
    ```js
    function sayMessage(message) {
      console.log(`${message}, this is ${this.name}`);
    }
    const person = { name: "Alice" };
    const boundFunc = sayMessage.bind(person);
    boundFunc("Hi");  // "Hi, this is Alice"
    ```