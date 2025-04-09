## 1. **JavaScript Classes**

### **Basic Class Definition**

```js
class Person {
  constructor(name, age) {
    this.name = name; // public property
    this.age = age;   // public property
  }

  // Prototype method shared by all instances
  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const alice = new Person('Alice', 30);
alice.greet();  // Output: Hi, I'm Alice and I'm 30 years old.
```

### **Inheritance**

```js
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age); // Calls the parent constructor
    this.role = role;
  }

  work() {
    console.log(`${this.name} is working as a ${this.role}.`);
  }
}

const bob = new Employee('Bob', 28, 'Developer');
bob.greet(); // Inherited from Person
bob.work();  // Output: Bob is working as a Developer.
```

### **Static Methods**

```js
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(5, 7)); // Output: 12
```

### **Getters and Setters**

```js
class Circle {
  constructor(radius) {
    this._radius = radius; // Convention: using underscore to indicate "private" property
  }

  // Getter: computed property that looks like a field
  get area() {
    return Math.PI * this._radius ** 2;
  }

  // Setter: validate or process input before setting the value
  set radius(newRadius) {
    if (newRadius > 0) {
      this._radius = newRadius;
    }
  }
}

const circle = new Circle(5);
console.log(circle.area); // Output: 78.53981633974483 (approx.)
circle.radius = 10;
console.log(circle.area); // Updated area with new radius
```

### **Private Fields (ES2022+)**

```js
class BankAccount {
  #balance = 0; // True private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance());  // Output: 100
// console.log(account.#balance);    // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

---

## 2. **Comparison: JavaScript vs. Java (Traditional OOP)**

| Feature                    | JavaScript                                    | Java                                   |
|----------------------------|-----------------------------------------------|----------------------------------------|
| **Definition**             | `class Person { ... }`                         | `public class Person { ... }`           |
| **Inheritance**            | Uses `extends` and `super()`                  | Uses `extends` and `super()`           |
| **Typing**                 | Dynamically typed                             | Statically typed                       |
| **Private Members**        | Convention using `_` or `__`; true privacy with `#` | Uses access modifiers (`private`, etc.)|
| **Static Methods**         | Declared with `static` inside the class       | Declared with `static`                 |

**Java Example (Simplified Pseudocode):**

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) { 
        this.name = name;
        this.age = age;
    }

    public void greet() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }
}

public class Employee extends Person {
    private String role;

    public Employee(String name, int age, String role) {
        super(name, age);
        this.role = role;
    }

    public void work() {
        System.out.println(name + " is working as a " + role);
    }
}
```

**Key Differences:**

- **Inheritance & Structure:**  
  Both languages use similar keywords (`extends`, `super()`), but JavaScript classes are syntactic sugar over prototypes, whereas Java classes are a core language feature with strict type checking.

- **Encapsulation:**  
  JavaScript has traditionally used naming conventions (like `_property`) to signal private members, now improved with `#` for real privacy. In Java, private members are enforced by the language.

- **Typing:**  
  JavaScript is dynamically typed, meaning types are checked at runtime, while Java is statically typed, with type checks at compile time.

---

## 3. **Naming Conventions: Underscores**

- **Single Underscore (`_property`):**  
  Indicates a property is for internal use or should be treated as "private" by convention, though it is still publicly accessible.

  ```js
  class User {
    constructor(username) {
      this._username = username;
    }
  }
  ```

- **Double Underscore (`__property`):**  
  Sometimes used to denote even more internal properties or to avoid naming conflicts in libraries. It is purely a naming convention.

  ```js
  class TaskScheduler {
    constructor() {
      this.__waitingQ = []; // Internal queue for tasks
    }
  }
  ```

- **True Private Fields (`#property`):**  
  Provides actual encapsulation, preventing any external access.

  ```js
  class Secret {
    #key = 'abc123'; // Truly private
    getKey() {
      return this.#key;
    }
  }
  ```
