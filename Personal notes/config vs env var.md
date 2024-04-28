**Using Configuration File:**

1. **Setup:**
   ```javascript
   // config.js
   module.exports = {
       username: 'your_username',
       password: 'your_password'
   };
   ```

2. **Access:**
   ```javascript
   // In your main application file
   const config = require('./config');
   const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.pyrexfq.mongodb.net/${DBname}`;
   ```

**Using Environment Variables with dotenv:**

1. **Setup:**
   - Install dotenv:
     ```bash
     npm install dotenv
     ```

   - Create a file named `.env` in the root of your project directory.

   - Inside `.env`, add your environment variables:
     ```
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

   - At the top of your main application file, add the following line:
     ```javascript
     require('dotenv').config();
     ```

2. **Access:**
   ```javascript
   // In your main application file
   const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pyrexfq.mongodb.net/${DBname}`;
   ```
## Make sure to add .env to your .gitignore file to avoid committing sensitive information to your repository.