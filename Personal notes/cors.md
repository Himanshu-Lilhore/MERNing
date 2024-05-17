# CORS

- Cross Origin Resource Sharing. All the things are nowadays are using different domains, ports, routes etc and when they request other services it gets denied because we cannot just allow any one to access resources like that, so the system gives CORS error when requesting service is not allowed to access that resource.  
- And CORS is the standard maintaining that security among systems, it prevents unauthorized cross-origin requests, which helps protect users' sensitive data.
- To allow resource sharing to other system a system either has to allow everyone the access or some specific domains.
- For example if our frontend and backend are hosted on different domains, frontend's resource requests will not be reponded as expected if backend doesn't allow cross origin resouce sharing yet.
- What happens when we setup CORS properly is, when someone requests something, the system checks if they are allowed to share resources with requester, if yes then it sets some headers in the response and sends it back, with that requester knows now they can send requests to access resources, and then the actual requests start exchanging between those two systems.
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

>  Here one very important thing to remember is, using `app.use(cors())` and allowing all request can backfire, because when browser observes that all kinds of request is being allowed in backend it blocks every request which has hearders containing credentials (cookies, token etc), it's kind of a safety feature. So usually in projects one should allow specific origin requests using the second method.

### In more technical terms :
When you specify origin: '*', you are essentially telling the server to allow requests from any origin. However, when you include credentials: true, the browser enforces stricter CORS rules for security reasons.

In CORS, when a request includes credentials (e.g., cookies), the browser first sends a preflight request (an HTTP OPTIONS request) to check if the server allows requests from the specific origin. If the server responds with a wildcard (*) for the Access-Control-Allow-Origin header in the preflight response, the browser blocks the request because it considers it insecure to send sensitive credentials to any origin.

In contrast, when you use a function for origin as in the second snippet, you have more control over which origins are allowed. In this case, you are explicitly allowing requests from http://localhost (or when the origin is null), which is the origin used during development. This more restrictive approach satisfies the browser's CORS requirements, and the request is allowed to proceed.

In summary, the second snippet works because it provides a more fine-grained control over the allowed origins, while the first snippet with origin: '*' does not meet the browser's stricter CORS requirements for requests with credentials.


### Here is how to implement it properly :
On backend use that method to allow only specific origin & on frontend you need to include this `Axios.defaults.withCredentials = true;` in every component where you want to use authorization or send credential headers with request.