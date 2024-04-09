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


## Requests & Responses (Lesson - 4)
### Request object :
Request object contains a large amount of data about the request being made to the server. For starters we can use few of its data like url to know current url being accessed/used.
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```

### Response object :
Response object is what we make and return to the browser/user post a request is made.
Plain text response :
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/plain');

	res.write('Himanshu Lilhore');
	res.end();
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```
HTML response :
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/html');

	res.write('<p>My Paragraph 1</p>');
	res.write('<p>My Paragraph 2</p>');
	res.end();
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```
Returning html page :
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/html');

	fs.readFile('./index.html', (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}
		else{
			res.write(data);
			res.end();
			// res.end(data);  // same as above 2 lines.
		}
	})
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```

### Basic routing :
For the different pages on our website, we are routing the user in a certain way, and if they try to access a url other then intended ones they are taken to 404 page. [in the main directory we have views folder and inside that we have all the page views]
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/html');

	let path = './views/';
	switch(req.url){
		case '/':
			path += 'index.html';
			break;
		case '/about':
			path += 'about.html';
			break;
		default:
			path += '404.html';
			break;
	}

	fs.readFile(path, (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}
		else{
			res.write(data);
			res.end();
			// res.end(data);  // same as above 2 lines.
		}
	})
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```

### Status codes :
100 range - informational responses  
200 range - success codes  
300 range - codes for redirects  
400 range - user of client error codes  
500 range - server error codes  

Commonly known :  
200 - OK  
301 - Resource moved  
404 - Not found  
500 - Internal server error  
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/html');

	let path = './views/';
	switch(req.url){
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}
		else{
			res.write(data);
			res.end();
			// res.end(data);  // same as above 2 lines.
		}
	})
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```
### Redirects :
Suppose earlier we had a url '/about-me', but later it was changed to '/about', now whoever comes to about-me should be redirected to about :
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	res.setHeader('Content-Type', 'text/html');

	let path = './views/';
	switch(req.url){
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-me':
			res.statusCode = 301;
			res.setHeader('Location', '/about');
			res.end();
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}
		else{
			res.write(data);
			res.end();
			// res.end(data);  // same as above 2 lines.
		}
	})
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```

## npm (Lesson - 5)
Node Package Manager - [npmjs.com](npmjs.com)  
- Essential tool for managing JavaScript packages, especially in Node.js environments.
- Simplifies package installation, version control, and dependency management processes.
- Enables seamless integration of third-party libraries and utilities into Node.js projects.
- **npm init** : This command creates 'package.json' file for the project which contains some data and more importantly the info about third party npm packages installed in the project.
- **npm install** : This command creates the node_modules folder for the project based on the package info present in the package.json file.  
### Popular npm packages used :  
- **Nodemon:**
  1. Automates server restarts upon file changes, enhancing the development workflow.
  2. Saves developers time and effort by eliminating the need for manual server restarts during development.
  3. > $nodemon filename.js 

- **Lodash:**
  1. Offers a comprehensive set of utility functions for JavaScript development.
  2. Enhances code readability and reduces development time by providing efficient solutions to common programming tasks.

## Express Apps (Lesson - 6)
Express in a node package which helps for better https servers. Not that https servers can to made and maintained well using raw nodejs itself, but express provides a better and a cleaner syntax of maintaining all the things associated with the server.  
After installing expressing using 'npm install express' we can start using it.  
Lets see and example where we convert the same server from earlier example to an express server.  
#### Pure `Node server` :
```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/html');

	let path = './views/';
	switch(req.url){
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		case '/about-me':
			res.statusCode = 301;
			res.setHeader('Location', '/about');
			res.end();
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}

	fs.readFile(path, (err, data) => {
		if(err){
			console.log(err);
			res.end();
		}
		else{
			res.end(data);
		}
	})
});

server.listen(3000, 'localhost', () => {
	console.log('listening for requests on port 3000');
});
```
#### `Express server` (same node server above converted) :
```javascript
const express = require('express');

const app = express();  // express app (one instance)

app.listen(3000);   // listening to requests at 3000 [localhost automatic]

app.get('/', (req, res) => {
	res.send('./views/index.html', {root : __dirname});
	// automatically infers the type of response we are sending (so no need for setting content type in header as in node)  // and automatically infers status code.
	// relative to __dirname in the position of that file, otherwise you can skip the second argument and write the absolute path there (wrt PC)
	// or write __dirname + relpath

	// res.send('<p>This is the homepage</p>'); 
})

app.get('/about', (req, res) => {
	res.send('./views/about.html', {root : __dirname})
})

// redirect
app.get('/about-me', (req, res) => {
	res.redirect('/about')
})

// 404
app.use((req, res) => {
	res.sendFile('./views/404.html', {root : __dirname})
    // use method helps create middleware (read later)
    // in simple terms, here every case in which url didn't match in about get functions it will come here and that will make it default.
    // Note - It is not a 'default' in node, its just that it is written at the bottom of all the other possible match cases, so it kind of becomes default since it comes at the end of all the other executions.
})
```

## View Engines (Lesson - 7)
### EJS (Embedded JavaScript templating) view engine
Using a view engine like EJS in Express allows for the injection of dynamic data into HTML templates, making it easier to serve dynamic content to the browser.
```shell
npm install ejs
```
```javascript
const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs')
// set method lets us change the settings for this app

app.listen(3000);

app.get('/', (req, res) => {
	res.send('./views/index.html', {root : __dirname});
})

app.get('/about', (req, res) => {
	res.send('./views/about.html', {root : __dirname})
})

app.get('/about-me', (req, res) => {
	res.redirect('/about')
})

app.use((req, res) => {
	res.sendFile('./views/404.html', {root : __dirname})
})
```

## About EJS
- EJS allows for the injection of dynamic data into HTML templates in Express.
- View engines like Express Handlebars, Pug, and EJS can be used to create HTML templates with dynamic content.
- EJS templates can be created in the default “views” folder or in a custom folder specified in the Express configuration.
- The EJS templates can be rendered and served to the browser using the `response.render()` method in Express.
- Dynamic content can be added to EJS templates using EJS tags and by passing data from the app to the view using the `response.render()` method.

```html
<html lang="en">
<%- include("./partials/head.ejs") %>

<body>
  <%- include("./partials/nav.ejs") %>

  <div class="blogs content">
    <h2>All Blogs</h2>

    <% if (blogs.length > 0) { %>
      <% blogs.forEach(blog => { %>

        <h3 class="title"><%= blog.title %></h3>
        <p class="snippet"><%= blog.snippet %></p>

      <% }) %>
    <% } else { %>
      <p>There are no blogs to display...</p>
    <% } %>
    
  </div>

  <%- include("./partials/footer.ejs") %>
</body>
</html>
```
- In this code snippet above, we have an EJS file, it is just an html file but with EJS code included. What EJS does is lets us dynamically inject elements into the html page based on some condition.  
- We can just write `<% ... %>` are write a JS line of code in  there, but also we can use `<%- ... %>` which allows us to put some other ejs file (called partials) within current one, kept within './views/partials'. And `<%= title %>` to directly access a variable there.

