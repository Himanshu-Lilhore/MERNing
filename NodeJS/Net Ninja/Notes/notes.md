# NodeJS

Source : [Net Ninja - NodeJS crash course](https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&si=cTCCsoFcGkq_TSef)

## Intro (Lesson-1)

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

### About EJS
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

## Middlewares (lesson - 8)
![Middlewares](./images/middlewares.png)
Simply, middlewares are is everything that happens between a request made and corresponding response sent (functions generally).  

![MiddlewaresEg](./images/middlewareEg.png)  
Every file we write, we write all the functions/middlewares from top to bottom. Now where a request is made, the system starts checking for matches (for middleware) from top to bottom and which fulfills the request is the last executed one. So the order in which functions are placed is important here.
```javascript
app.use((req, res) => {
	console.log("New request made")
	console.log("host : ", req.host)
	console.log("path : ", req.path)
	console.log("method : ", req.method)
})
```
Here we created a custom middleware, and if it is placed the top of the file it will always get executed first, and since we have not instructed it to do anything else the system will be stuck there.  
So if this middleware was just there for logging purposes, we can tell it to move to next function like this :
```javascript
app.use((req, res, next) => {
	console.log("New request made")
	console.log("host : ", req.host)
	console.log("path : ", req.path)
	console.log("method : ", req.method)
	next()
})
```
### 3rd party middleware
Instead of creating all these middleware manually, we can use a lots of middlewares already present for a lot of different purposes.  
1. [**Morgan**](https://www.npmjs.com/package/morgan) (a logger middleware)
	> npm install morgan  

	```javascript
	const morgan = require('morgan')

	app.use(morgan('dev'))
	app.use(morgan('tiny'))
	```
2. **Static** (provided by express)  
	Since browser protects the project files to be accessed by the user diretly using url, we use static to make them public/less restrictive.
	```javascript
	app.use(express.static('publicc'))
	```
	So any files stored inside this `publicc` folder will be accessible by users too. [conventionally it is name public, but just to avoid keyword confusion i named it publicc here]


## MongoDB (lesson - 9)

1. Introduction to MongoDB and NoSQL Databases:
   - MongoDB is a NoSQL database that differs from traditional SQL databases in its data structuring.
   - Example: SQL databases like MySQL use fixed-schema tables, whereas MongoDB uses collections and documents. For instance, in MongoDB, a collection named "users" can contain documents with varying fields like name, email, and age, providing more flexibility.

2. MongoDB's Structure: Collections and Documents:
   - MongoDB organizes data into collections, which are analogous to tables in SQL databases, and documents, which are similar to rows or records.
   - Example: In a MongoDB database, a collection named "products" may contain documents representing different products, each with its own set of fields such as name, price, and category.

3. MongoDB Atlas:
   - MongoDB Atlas is a cloud-based database service that simplifies the deployment, management, and scaling of MongoDB databases.
   - Example: Developers can use MongoDB Atlas to host their databases on the cloud, enabling easy access and management from anywhere.

4. Introduction to Mongoose:
   - Mongoose is an Object Document Mapping (ODM) library for MongoDB in Node.js applications, providing a higher level of abstraction for interacting with MongoDB databases.
   - Example: With Mongoose, developers can define schemas and models to represent MongoDB data structures and perform CRUD (Create, Read, Update, Delete) operations on collections.

5. Schemas in MongoDB:
   - Schemas in MongoDB define the structure of documents within a collection, specifying the fields and their data types.
   - Example: A schema for a "user" document may include fields such as name (String), email (String), and age (Number), ensuring consistency and validation of data.

6. Models in MongoDB:
   - Models in Mongoose provide an interface for interacting with MongoDB collections, encapsulating CRUD operations and business logic.
   - Example: A model for the "user" collection can have methods like createUser(), getUserById(), updateUser(), and deleteUser() to perform database operations.

7. Connecting to MongoDB with Mongoose:
   - Connecting to a MongoDB database using Mongoose involves providing a connection string and using the Mongoose connect method.
   - Example: Developers can use Mongoose.connect() method with the MongoDB connection string to establish a connection to the database.

8. Key Insights:
   - NoSQL databases like MongoDB offer flexibility in data structuring compared to SQL databases.
   - Mongoose simplifies MongoDB interaction by providing a higher level of abstraction.
   - Schemas and models play crucial roles in defining and interacting with MongoDB data.
   - MongoDB Atlas provides a convenient way to host and manage MongoDB databases on the cloud.
   - MongoDB documents are JSON-like structures, making them easy to work with in JavaScript environments.
   - Connecting to MongoDB using Mongoose requires providing connection details and using Mongoose methods.

> **Database > Collections > Documents > Schema (Blueprint/structure of a type of document)**  

### Setup 

> npm install mongoDB  
npm install mongoose

> Create DB on mongo Atlas and get link to connect to your cluster, url will be like this :
`mongodb+srv://USERNAME:PASSWORD@cluster0.pyrexfq.mongodb.net/DBNAME?retryWrites=true&w=majority&appName=Cluster0`

> To make DB accessible from all IPs, whitelist 0.0.0.0/0 :
![MongoIP](./images/mongoIP.png)


### Making schemas & using models

To store and access data from a collection, we have to define the structure of the document we will be storing. That is schema :
```javascript
// models > blogs.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
```
Here timestamps property will be automatically generated by DB.
Also, here our model name is 'Blog' (singular entity), the system now will automatically search for a collection named 'Blogs' (plural of that). If not present then it will create new with that name.

> Schema is blueprint of object, and model is the abstraction of CRUD operation wrapped around it. Those CRUD operation will automatically be provided by mongoose (ig).  

**Saving new object :**
```javascript
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    })
})
```  

**Finding objects :**
```javascript
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    })
})
// OR
app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
    });
});
// OR
app.get('/blogs', (req, res) => { 
  Blog.find().sort({ createdAt: -1 }) // sorted by decending order of date here
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
```


## Get, Post & Delete Requests (lesson - 10)

![Request Types](./images/requestTypes.png)

### Key Insights:
1. **Understanding Requests:** Knowing the purpose of different request types aids in building CRUD applications effectively.
2. **Route Parameters:** Facilitates handling dynamic URLs and extracting variable values.
3. **Middleware:** Utilizing middleware like `express.urlencoded` simplifies form data parsing in POST requests.
4. **Request Handling:** Setting up appropriate routes and callback functions is essential for handling different types of requests effectively.
5. **Request Types:**
   - GET: Retrieve data
   - POST: Create data
   - DELETE: Delete data
   - PUT: Update data


### Types of Requests:
1. **GET Requests:**
   - **Purpose:** Retrieve resources from the server.
   - **Example:** Fetching user profile information.
   ```javascript
   app.get('/user/:id', (req, res) => {
       // Retrieve user data based on id
   });
   ```
   Till now we have only been using GET request.

2. **POST Requests:**
   - **Purpose:** Create new data in the database.
   - **Example:** Submitting a form to add a new product.
   ```javascript
   app.post('/products', (req, res) => {
       // Add new product to the database
   });
   ```
   Now let see how we do it in our program :
   ```html
	<div class="create-blog content">
		<form action="/blogs" method="POST">
			<label for="title">Blog title : </label>
			<input type="text" id="title" name="title" required>
			<label for="snippet">Blog snippet : </label>
			<input type="text" id="snippet" name="snippet" required>
			<label for="body">Blog body : </label>
			<textarea id="body" required name="body"></textarea>
			<button>Submit</button>
		</form>
	</div>
   ```
   Now here here in html we are using html form tag which has method and action based on which we can take input from it and send it to backend.
   We just need to put `name` attribute same as property name that we are going to use in the backend. And on clicking Submit button for that form, it will be sent to backend (because we used method attribute as `POST` for the form element)
   ```javascript
   app.use(express.urlencoded()) // middleware

   app.post('/blogs', (req, res) => {
	  const blog = new Blog(req.body)

    blog.save()
      .then(result => res.redirect('/blogs'))
      .catch(err => console.log(err))
   })
   ```
   Now here before using post we are using a middleware in express `urlencoded` which sort the data a bit, and puts in into the body prop of the request object, which we can later use.

3. **DELETE Requests:**
   - **Purpose:** Delete data from the server.
   - **Example:** Deleting a specific user account.
   ```javascript
   app.delete('/user/:id', (req, res) => {
       // Delete user data based on id
   });
   ```
  In out program we are handling it like this -  
  frontend :
  ```html
  <div class="details content">
    <h2><%= blog.title %></h2>
    <div class="content">
      <p><%= blog.body %></p>
    </div>
    <a class="delete" data-doc="<%= blog._id %>">delete</a>
  </div>

  <script>
    const trashcan = document.querySelector('a.delete')

    trashcan.addEventListener('click', (e) => {
      const endpoint = `/blogs/${trashcan.dataset.doc}`

      fetch(endpoint, { method: 'DELETE' })  // This performs a DELETE request to the endpoint URL. It deletes the blog post corresponding to the _id specified in the URL. The { method: 'DELETE' } option specifies that it's a DELETE request.
      .then(response => response.json())
      .then(data => window.location.href = data.redirect)
      .catch(err => console.log(err))
    })
  </script>
  ```
  backend :
  ```javascript
  app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id

	Blog.findByIdAndDelete(id)
		.then(result => res.json({ redirect: '/blogs' }))
		.catch(err => console.log(err))
  })
  ```
4. **PUT Requests:**
   - **Purpose:** Update existing data.
   - **Example:** Updating user profile information.
   ```javascript
   app.put('/user/:id', (req, res) => {
       // Update user data based on id
   });
   ```

### Route Parameters:
  - **Definition:** Route parameters allow creating dynamic URLs.
  - **Example:** Extracting user id from URL.
  ```javascript
  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => res.render('details', { blog: result, title: 'Blog Details' }))
    .catch(err => console.log(err))
  })
  ```
  ![Route Parameters](./images/route%20parameters.png)  

### Middleware:
- **Definition:** Middleware helps in handling form data in POST requests.
- **Example:** Using `express.urlencoded` middleware to parse form data.
```javascript
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
```