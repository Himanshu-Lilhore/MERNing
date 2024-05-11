# HTTP Requests:

> Cookies are stored locally on the device and can to sent to server when need by including them in header (preferrably) or body of the http request.  

> http request contains Request line, header & body. And this is stream of text being sent to the server.


## Walkthrough

In the vast landscape of web development, understanding the structure of HTTP requests is crucial. However, navigating the intricacies of request components can be daunting, especially for those new to the realm.

**Solution 1: Components Overview**

To tackle this challenge, we start by breaking down HTTP requests into their fundamental components:
- **Request Line**: Contains the request method, target URL (request URI), and HTTP version.
- **Headers**: Additional metadata providing context about the request.
- **Request Body** (Optional): Data sent by the client to the server, often included in requests such as POST or PUT.

**Problem 2: Data Transmission Concerns**

As our journey progresses, we encounter concerns regarding data transmission. How should data be transmitted within HTTP requests, and which components are suitable for different types of data?

**Solution 2: Choosing Transmission Methods**

To address this, we delve into the nuances of data transmission:
- **Request Body**: Ideal for transmitting large or complex data payloads, such as form submissions or JSON data.
- **Headers**: Used to convey metadata about the request, including content type, authentication credentials, and caching directives.

**Problem 3: Security Considerations**

Security is a paramount concern in the digital realm. With HTTP requests transmitting data across the internet, ensuring the confidentiality and integrity of this data is imperative.

**Solution 3: HTTPS Encryption**

To safeguard against security threats, we embrace HTTPS encryption:
- **HTTPS**: Encrypts data transmitted between the client and server using Transport Layer Security (TLS). This encryption ensures that data remains confidential and protected from eavesdropping or tampering by malicious actors.

**Problem 4: Client-Side Handling**

Finally, we address the challenge of client-side handling of HTTP requests. How can we ensure a seamless user experience while making requests from the client side?

**Solution 4: Asynchronous Requests and Promises**

To optimize client-side performance and user experience, we leverage asynchronous requests and promises:
- **Asynchronous Requests**: Enable non-blocking request handling, allowing the client to continue executing other tasks while awaiting a response.
- **Promises**: Provide a clean and efficient way to handle asynchronous operations, simplifying error handling and callback management in HTTP requests.

**Conclusion: A Journey of Understanding and Optimization**

Through our technical journey, we've gained a deeper understanding of HTTP requests and their components. By addressing challenges such as data transmission, security, and client-side handling, we've optimized our approach to HTTP communication, paving the way for efficient and secure web applications.



## Detailed notes 

**1. Overview:**
- HTTP (Hypertext Transfer Protocol) is a protocol used for communication between a client (such as a web browser) and a server.
- HTTP requests are messages sent by the client to request resources from the server.

**2. Request Components:**
- **Request Line**: The first line of an HTTP request containing the request method, target URL (request URI), and HTTP version.
  - Example: `GET /example HTTP/1.1`

- **Headers**: Additional metadata included in the request to provide information such as content type, user agent, and authentication credentials.
  - Example:
    ```
    Host: example.com
    User-Agent: Mozilla/5.0
    Content-Type: application/json
    ```

- **Request Body** (Optional): Data sent by the client to the server, typically included in requests such as POST, PUT, or PATCH.
  - Example (JSON):
    ```json
    {
        "username": "john_doe",
        "password": "secretpassword"
    }
    ```

**3. HTTP Methods:**
- HTTP defines several request methods indicating the desired action to be performed by the server.
- Common HTTP methods include:
  - **GET**: Retrieve data from the server.
  - **POST**: Submit data to the server to create a new resource.
  - **PUT**: Update an existing resource on the server.
  - **DELETE**: Delete a resource from the server.
  - **PATCH**: Partially update a resource on the server.
  - And more.

**4. Headers in Requests:**
- Headers provide additional information about the request or the client making the request.
- Common headers include:
  - `Host`: Specifies the domain name of the server.
  - `User-Agent`: Identifies the client making the request (e.g., browser type).
  - `Content-Type`: Indicates the type of data sent in the request body.
  - `Authorization`: Contains authentication credentials (e.g., JWT) for access control.
  - And many more.

**5. Cookies:**
- Cookies are small pieces of data stored by the client's browser.
- When the server instructs the client to set a cookie (via the `Set-Cookie` header), the client's browser stores the cookie locally.
- Cookies are automatically included in subsequent requests to the same domain in the `Cookie` header.
- Used for various purposes, including session management, user tracking, and personalization.

**6. Local Storage:**
- Local storage is a client-side storage mechanism provided by modern web browsers.
- Allows web applications to store data locally on the client's device.
- Data stored in local storage is not automatically included in HTTP requests and must be explicitly read by the application and included in requests as needed.


