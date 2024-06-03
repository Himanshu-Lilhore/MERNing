**Deploying Frontend and Backend on Vercel:**

1. **Add `vercel.json` File for Backend:**

```json
// backend/vercel.json
{
    "version": 2,
    "builds": [
      { "src": "./app.js", "use": "@vercel/node" }
    ],
    "routes": [
      { "src": "/(.*)", "dest": "/app.js" }
    ]
}
```

2. **Add `vercel.json` File for Frontend:**

```json
// frontend/vercel.json
{
    "version": 2,
    "builds": [
      {
        "src": "package.json",
        "use": "@vercel/static-build",
        "config": { "distDir": "dist" }
      }
    ],
    "routes": [
      { "handle": "filesystem" },
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

5. **Make sure vite.config.js should be like this (frontend):**
```json
{
  // ...
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
  // ...
}
```

6. **Deploy to Vercel:**
   
   - Commit your changes to your Git repository.
   - Deploy both front and back end sepertely.
   - Everytime you push changes to github, vercel will deploy them automatically.
