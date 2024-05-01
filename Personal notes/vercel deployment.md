**Deploying Frontend and Backend on Vercel:**

1. **Add `vercel.json` File for Backend:**

```json
// backend/vercel.json
{
  "version": 2,
  "builds": [
    { "src": "./server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/server.js" }
  ]
}
```

2. **Add `vercel.json` File for Frontend:**

```json
// frontend/vercel.json
{
  "version": 2,
  "builds": [
    { "src": "./", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

3. **Add `engines` Property to Backend `package.json`:**

```json
// backend/package.json
{
  // ...
  "engines": {
    "node": "20.x"
  },
  // ...
}
```

4. **Add `engines` Property to Frontend `package.json`:**

```json
// frontend/package.json
{
  // ...
  "engines": {
    "node": "20.x"
  },
  // ...
}
```

5. **Deploy to Vercel:**
   
   - Commit your changes to your Git repository.
   - Deploy both front and back end sepertely.
   - Everytime you push changes to github, vercel will deploy them automatically.
