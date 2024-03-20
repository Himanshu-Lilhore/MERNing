const express = require('express');

const app = express();  // express app (one instance)

app.listen(3000);   // listening to requests at 3000 [localhost automatic]

app.get('/', (req, res) => {
	res.sendFile('./views/index.html', {root : __dirname});
	// automatically infers the type of response we are sending (so no need for setting content type in header as in node)  // and automatically infers status code.
	// relative to __dirname in the position of that file, otherwise you can skip the second argument and write the absolute path there (wrt PC)
	// or write __dirname + relpath

	// res.send('<p>This is the homepage</p>'); 
})

app.get('/about', (req, res) => {
	res.sendFile('./views/about.html', {root : __dirname})
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