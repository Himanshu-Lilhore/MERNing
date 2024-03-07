# Programming with Mosh

source vid - [https://www.youtube.com/watch?v=TlB_eWDSMt4](https://www.youtube.com/watch?v=TlB_eWDSMt4)

### Intro :

- Asynchronous non-blocking nature of JS allows good performance even with single thread in JS.
- JS is browser based, it runs in browser, so therefore there we have objects like document & window, which we use to access our page. But Node isn’t browser based, it took v8 out to interpret js outside of browser which we know as NodeJS. And here we don’t get those document and window objects.

 

### Global object :

- In JS we have window object for everything we define globally, even when we don’t prefix definition of things with ‘window’ it is internally written like window.variableName & we have a lots of pre-build functions that comes with that window object like setTimeout, setInterval etc, but we don’t have to call them like window.setTimeout(), JS internally does it for us. Now here in Node, similarly we have Global object, but the different thing here is, the things declared globally (without prefixing it with ‘Global’ keyword) are not scoped into Global object automatically, so if we want the Global object to contain some variable or function that we define, we have to prefix it with Global keyword.
    
    ```jsx
    // In a Node.js module
    
    // Declaring a variable without attaching it to the global object
    const myModuleScopedVariable = 'This variable is scoped to this module';
    
    // Exporting a function that accesses the module-scoped variable
    exports.logModuleScopedVariable = function() {
        console.log(myModuleScopedVariable);
    };
    ```
    
    ```jsx
    // In a Node.js module
    
    // Attaching a variable to the global object
    global.myGlobalVariable = 'This variable is globally accessible';
    
    // Exporting a function that accesses the globally scoped variable
    exports.logGlobalVariable = function() {
        console.log(global.myGlobalVariable);
    };
    ```
    

### Modules :

- In JS, every .js file is a module. In Node each of those files has an object associated with it called ‘module’, which contains some information about the current file/module in form of key value pair obviously :
    
    ![Module Object](./images/moduleObj.png)
    
- Note : module is not a object contained in global object.
- And this module object is not available outside of a file, but it is used to export things out of the file using one of its properties called ‘exports’. Support we have two files logger.js and app.js, and we have to export a function from logger to app, so here is how we do it :
    
    ```jsx
    // Logger.js
    
    function myLogger(msg){
    	console.log(msg)
    }
    
    module.exports.myLogger = myLogger  // exporting as it is
    //module.exports.standardLogger = myLogger  // renaming while exporting
    //module.exports = myLogger  // instead of putting myLogger function in exports object, we assign the function to exports object itself
    ```
    
    ```jsx
    // app.js
    let logger = require(./logger)
    
    logger.myLogger('message here')
    ```
    

