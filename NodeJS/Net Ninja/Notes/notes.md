# NodeJS

Source : [Net Ninja - NodeJS crash course](https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&si=cTCCsoFcGkq_TSef)

### Intro (Lesson-1)

1. **Server-Side JavaScript Execution**: Node.js empowers developers to execute JavaScript code on the server side, expanding its utility beyond client-side scripting. This enables developers to build full-stack applications using a single language throughout the entire development process.

2. **Efficient Execution Engine**: Built on top of Google's V8 JavaScript engine and written in C++, Node.js efficiently compiles JavaScript code into machine code, enhancing its performance and scalability for server-side operations.

3. **Versatile Server-Side Capabilities**: Node.js facilitates handling client requests, managing databases, and manipulating files on servers. Its event-driven, non-blocking I/O model enables asynchronous handling of operations, leading to improved performance and scalability in web applications.

4. **Unified JavaScript Development**: By using Node.js, developers can employ JavaScript for both front-end and back-end development tasks, promoting code reusability and streamlining the development process. This unified approach simplifies project management and enhances collaboration among developers.

5. **Thriving Community and Ecosystem**: Node.js boasts a vibrant community of developers and a vast ecosystem of third-party packages and tools tailored for web development. This rich ecosystem provides developers with access to a plethora of libraries, frameworks, and resources to expedite development and address diverse project requirements.

6. **Popular Frameworks and Databases**: Express.js stands out as a widely adopted framework for building web applications with Node.js, offering a minimalistic yet powerful foundation for web server development. Additionally, MongoDB, a popular NoSQL database, seamlessly integrates with Node.js, providing flexible data storage solutions for modern web applications.


## Basics (Lesson-2)

**Global Object:**
- `global` is the global object in Node.js, akin to the `window` object in browser-based JavaScript.
- Provides access to global variables and functions. Example:
    ```javascript
    console.log(global);
    console.log(window);
    ```

**Modules & Require:**
- Use `require()` to import modules in Node.js.
- Node.js provides built-in modules like `os` and `fs`.
- `os` module offers operating system-related utility methods such as platform information and home directory.
    ```javascript
    const os = require('os');
    console.log(os.platform()); // Returns the operating system platform
    console.log(os.homedir()); // Returns the home directory of the current user
    ```
- `fs` module facilitates file system operations like reading, writing, creating, and deleting files and directories.
    ```javascript
    const fs = require('fs');
    fs.readFile('./docs/blog.txt', (err, data) => { }); // Read files asynchronously
    fs.writeFile('./docs/blog.txt', 'hello, world', () => { }); // Write data to a file
    fs.mkdir('./assets', err => { }); // Create a directory
    fs.unlink('./docs/deleteme.txt', err => { }); // Delete a file
    ```
- Modules allow exporting variables, functions, or objects from one file to another.
- Use module.exports to export from one file and require() to import into another. Example:
    ```javascript
    // people.js:
    const people = ['yoshi', 'ryu', 'chun-li', 'mario'];
    const ages = [20, 25, 30, 35];

    module.exports = {
    people,
    ages,
    };
    // Actually it implies :
    module.exports = {
    people : people,
    ages : ages,
    }
    ```
    ```javascript
    // modules.js:
    const { people, ages } = require('./people');
    console.log(people, ages);
    ```
    ![Module Object](./images/moduleObj.png)

**Node & the File System:**
- Node.js provides the `fs` module for file system operations.
- Perform actions like reading, writing, creating, and deleting files and directories. Example:
    ```javascript
    const fs = require('fs');

    // reading files
    fs.readFile('./docs/blog.txt', (err, data) => {
    if (err) {
        console.log(err);
    }  
    console.log(data.toString());
    });

    // console.log('last line');

    // writing files
    fs.writeFile('./docs/blog.txt', 'hello, world', () => {
    console.log('file was written');
    });

    fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
    console.log('file was written');
    });

    // directories
    if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', err => {
        if (err) {
        console.log(err);
        }
        console.log('folder created');
    });
    } else {
    fs.rmdir('./assets', err => {
        if (err) {
        console.log(err);
        }
        console.log('folder deleted');
    });
    }

    // deleting files
    if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', err => {
        if (err) {
        console.log(err);
        }
        console.log('file deleted');
    });
    }
    ```

**Streams & Buffers:**
- Streams enable efficient handling of large data sets by reading and writing data in chunks.
- Use `fs.createReadStream()` and `fs.createWriteStream()` to work with streams.
- Example:
    ```javascript
    const fs = require('fs');
    const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});
    const writeStream = fs.createWriteStream('./docs/blog4.txt');
    readStream.on('data', chunk => {
    console.log('---- NEW CHUNK ----');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK:\n');
    writeStream.write(chunk);
    });
    // Instead of writing the above function, we can just write :
    readStream.pipe(writeStream);  // Piping
    ```
- **Piping** -
    Piping is a mechanism to transfer data from one stream to another, often used for efficient data processing.

    ![Streams & Buffers](./images/StreamsAndBuffers.png)


## Clients & Servers (Lesson-3)

**Domain Names and IP Addresses:**
   - Domain names resolve to IP addresses for server connection without memorizing IP addresses.
   - Example: Typing "www.example.com" resolves to IP "192.0.2.1".

**Manual Server Creation with HTTP Module:**
   - Servers are manually created using HTTP module's `createServer()` method, taking a callback for handling requests and responses.
   - Example:
        ```javascript
        const server = http.createServer((req, res) => { });
        ```

**Importance of HTTP in Server-Client Communication:**
   - HTTP enables standardized communication between servers and clients, facilitating data and instruction exchange.

**Localhost for Development:**
   - Localhost allows using the local computer for development, enabling testing and debugging before deployment.

**GET Requests and Resource Retrieval:**
   - Browsers send GET requests to servers to retrieve requested resources, like HTML pages.

**Port Numbers for Internet Communications:**
   - Port numbers direct internet communications to different programs on a computer, ensuring information separation.

**Creating Servers with Node.js:**
   - Node.js creates servers using `createServer()` method, and `listen()` method specifies port and callback for server to listen for requests. Example:
        ```javascript
        server.listen(3000, 'localhost', () => {
        console.log('listening for requests on port 3000');
        });
        ```


# continue from here [4th vid](https://www.youtube.com/watch?v=DQD00NAUPNk&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4)