# Authentication

## Walkthrough

In the realm of web development, security is paramount. Initially, the challenge lies in securing access to our application's resources. Without proper authentication, unauthorized users could compromise sensitive data.

**Solution 1: Stateful Authentication**

To address this, we implement stateful authentication. By maintaining session state on the server, we validate user identities with each request. This approach ensures that only authenticated users gain access to our application's protected areas.

**Problem 2: Scalability Concerns**

As our application gains traction, scalability becomes a concern. With stateful authentication, managing sessions can strain server resources, potentially hindering scalability and performance.

**Solution 2: Stateless Authentication with JWTs**

To alleviate this burden, we transition to stateless authentication using JSON Web Tokens (JWTs). JWTs carry authentication data within themselves, removing the need for server-side session management. This approach improves scalability and reduces server overhead.

**Problem 3: Integration Complexity**

However, integrating JWTs introduces its own challenges. Generating, validating, and managing JWTs requires intricate cryptographic operations and token lifecycle management.

**Solution 3: Server-Side Implementation**

To overcome this hurdle, we implement robust server-side mechanisms for JWT management. This involves generating JWTs securely, validating them on each request, and handling token expiration and revocation. By centralizing these operations on the server, we ensure consistency and security across our application.

**Problem 4: User Experience**

Finally, we consider the user experience. While security is paramount, authentication must not impede usability. Traditional authentication methods, such as session IDs, can disrupt the user journey with frequent logins.

**Solution 4: Client-Side Integration**

To enhance the user experience, we explore client-side authentication. By integrating OAuth providers and authentication libraries, we empower users to seamlessly authenticate without disrupting their workflow. This client-side approach streamlines the authentication process, enhancing user satisfaction and engagement.

**Conclusion: A Secure and Scalable Solution**

Through progressive iterations and innovative solutions, we've addressed authentication challenges while enhancing scalability and usability. By transitioning from stateful to stateless authentication with JWTs and adopting client-side integration, we've forged a secure and scalable authentication solution fit for the demands of modern web applications.




## Detailed notes

**1. Overview:**
   - Authentication is the process of verifying the identity of a user or entity attempting to access a system or resource.
   - It is essential for controlling access to protected resources and ensuring the security of web applications.

**2. Authentication Methods:**
   - **Stateful Authentication**: Involves maintaining session state on the server, typically using session IDs or cookies.
     - Example Code (Express.js with session-based authentication):
       ```javascript
       // Express session setup
       const session = require('express-session');
       app.use(session({
           secret: 'mySecretKey',
           resave: false,
           saveUninitialized: false
       }));
       ```

   - **Stateless Authentication**: Uses tokens or other mechanisms to authenticate each request, without maintaining session state on the server.
     - Example Code (JWT authentication):
       ```javascript
       // JWT token generation and verification
       const jwt = require('jsonwebtoken');
       const secretKey = 'mySecretKey';

       // Generate token
       const token = jwt.sign({ userId: '123' }, secretKey, { expiresIn: '1h' });

       // Verify token
       const decodedToken = jwt.verify(token, secretKey);
       ```

**3. Implementation:**
   - **Server-Side Authentication**:
     - Creating routes and controllers to handle user authentication, registration, and verification on the server.
     - Example Code (Express.js route for user login):
       ```javascript
       // Login route
       app.post('/login', (req, res) => {
           // Validate user credentials
           if (req.body.username === 'user' && req.body.password === 'password') {
               req.session.userId = '123'; // Set user session
               res.status(200).send('Login successful');
           } else {
               res.status(401).send('Invalid credentials');
           }
       });
       ```

   - **Client-Side Integration**:
     - Integrating authentication libraries or APIs on the client side for seamless user authentication.
     - Example Code (React component for user login):
       ```jsx
       import React, { useState } from 'react';
       import axios from 'axios';

       const Login = () => {
           const [username, setUsername] = useState('');
           const [password, setPassword] = useState('');

           const handleLogin = async () => {
               try {
                   const response = await axios.post('/login', { username, password });
                   console.log(response.data);
               } catch (error) {
                   console.error(error);
               }
           };

           return (
               <div>
                   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                   <button onClick={handleLogin}>Login</button>
               </div>
           );
       };

       export default Login;
       ```

**4. Security Considerations:**
   - Implementing measures such as password hashing, token expiration, and secure storage of sensitive information to enhance security.
   - Example Code (Password hashing with bcrypt):
     ```javascript
     const bcrypt = require('bcrypt');

     // Hash password
     const hashedPassword = await bcrypt.hash('password', 10);

     // Compare hashed password with user input
     const isPasswordMatch = await bcrypt.compare('password', hashedPassword);
     ```

## Login function
```javascript
const login = async(req, res) => {
    const userExists = await User.findOne({email:req.body.email})
    const passwordMatches = await bcrypt.compare(req.body.password, userExists.password)
    const expiresInMs = 3600000*1  // 1 hr = 3600000 ms

    if(userExists && passwordMatches){
        const token = jwt.sign(
            {username:userExists.username, email:userExists.email}, 
            process.env.SECRET_KEY, 
            {expiresIn: expiresInMs}
        )
        res.cookie('token', token, {httpOnly:true, maxAge: expiresInMs})
        res.status(200).json("User logged in successfully !")
    }
    else {
        res.status(400).json("Invalid user  OR  wrong username-password ")
    }
}
```

## Auth check
```javascript
function tokenize(username, email, timeInMs){
    const token = jwt.sign(
        {username, email}, 
        process.env.SECRET_KEY, 
        {expiresIn: timeInMs}
    )
    return token
}
  

function detokenize(token){
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    return decodedToken
}
  
  
const authCheck = async (req, res, next) => {
    const token = req.headers.authorization || req.cookies.token

    try {
        const decodedToken = detokenize(token)

        const userExists = await User.findOne({email:decodedToken.email, username:decodedToken.username})

        if(userExists) console.log("\nSession authenticated successfully\n")

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("\nToken expired\n")

            res.clearCookie('token')
            res.status(200).json({ message: "Session expired, please login again." })
        }
        else{
            console.error("\nFailed to verify token:", error)
    
            // Handle invalid token error
            res.status(401).json({ error: "Unauthorized" })
        }
        // HANDLE REDIRECT TO LOGIN PAGE IN FRONTEND !!
    }
}
```