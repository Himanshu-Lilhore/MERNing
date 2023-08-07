GPT answer::
In JavaScript, when you write functions without using `async`, they are synchronous by default. The code will execute line by line, and any function calls will block the execution until they complete. When you use asynchronous operations (e.g., API calls, reading files, etc.) inside a synchronous function, those operations will not block the entire script from executing, but they will run asynchronously in the background.

Here's an example to illustrate the difference:

Without `async/await` (Synchronous):
```javascript
function fetchData() {
  const data = fetchDataFromAPI1(); // Synchronous call, blocks until complete
  console.log('Data from API 1:', data);

  const data2 = fetchDataFromAPI2(data); // Synchronous call, blocks until complete
  console.log('Data from API 2:', data2);

  const result = data + data2;
  console.log('Final Result:', result);
}

fetchData(); // This will execute synchronously
console.log('After calling fetchData'); // This will execute after the fetchData function is completed
```

With `async/await` (Asynchronous):
```javascript
async function fetchData() {
  const data = await fetchDataFromAPI1(); // Asynchronous, execution will pause here until data is fetched
  console.log('Data from API 1:', data);

  const data2 = await fetchDataFromAPI2(data); // Asynchronous, execution will pause here until data is fetched
  console.log('Data from API 2:', data2);

  const result = data + data2;
  console.log('Final Result:', result);
}

fetchData(); // This will execute asynchronously, the function returns a Promise
console.log('After calling fetchData'); // This will execute immediately, before fetchData is completed
```

The main difference is that with `async/await`, the asynchronous function calls inside `fetchData` will not block the entire script, and the code after the `fetchData` function call (`console.log('After calling fetchData');`) will execute immediately. The execution of the code inside `fetchData` is paused at the `await` statements until the Promises are resolved, allowing other parts of the script to continue running.

In contrast, when you use normal synchronous functions, the entire script will be blocked during the execution of the synchronous function calls. This means the code after the function call will not execute until the function completes.

In summary, using `async/await` allows you to handle asynchronous operations in a more non-blocking, sequential, and readable way, while writing functions normally (synchronously) will block the execution until the function calls are completed.