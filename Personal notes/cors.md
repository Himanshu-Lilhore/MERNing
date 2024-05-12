# CORS

- Cross Origin Resource Sharing. All the things are nowadays are using different domains, ports, routes etc and when the request other services it gets denied because we cannot just allow any one to access resources like that, so the system gives CORS error when requesting service is not allowed to access that resource.  
- And CORS is the standard maintaining that security among systems, it prevents unauthorized cross-origin requests, which helps protect users' sensitive data.
- To allow resource sharing to other system a system either has to allow everyone the access or some specific domains.
- For example if our frontend and backend are hosted on different domains, frontend's resource requests will not be reponded as expected if backend doesn't allow cross origin resouce sharing yet.
- What happens in when CORS is setup is, when someone requests something, the system check if they are allows to share resources with them, if yes then if sets some headers in the response and sends it back, with with the requester knows now they can send requests to resource access, and then the actual requests start exchanging between those two systems.
- These headers include Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc., which indicate whether the requested resource is accessible and what methods and headers are allowed for cross-origin requests.
- This middleware (below) intercepts incoming requests and adds the appropriate CORS headers to the response before passing it on to the route handlers.
- So in our example to overcome that "CORS issue" in our mern project we handle it like this in backend :
    ```javascript
    const express = require('express');
    const cors = require('cors');
    const app = express();

    // Enable CORS for all requests
    app.use(cors());  // This will allow all services to request for resources

    // Your routes and other middleware
    // ...

    // Start the server
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });
    ```
- And, if you specifically only want to allow your frontend to have that access you can do this :
    ```javascript
    const express = require('express');
    const cors = require('cors');
    const app = express();

    // Allow requests only from your frontend origin
    const allowedOrigins = ['http://your-frontend-domain.com'];

    // Configure CORS middleware with specific origins
    app.use(cors({
    origin: function (origin, callback) {
        // Check if the request origin is in the allowedOrigins array
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
        } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
        }
    }
    }));

    // Your routes and other middleware
    // ...

    // Start the server
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

    ```
