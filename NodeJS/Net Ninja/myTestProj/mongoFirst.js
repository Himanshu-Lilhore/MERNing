const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const config = require('./config')
const DBname = 'firstTest'

const app = express();

const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.pyrexfq.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbURI)
	.then(result => {
		app.listen(3000)
		console.log("CONNECTED SUCCESSFULLY TO DB")
	})
	.catch(err => console.log("FAILED TO CONNECT TO DB : \n" + err))

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(morgan('dev'))
app.use((req, res, next) => {
	console.log("New request made")
	console.log("host : ", req.hostname)
	console.log("path : ", req.path)
	console.log("method : ", req.method)
	next()
})



// mongoose & mongo (tests)
app.get('/add-blog-through-code', (req, res) => {
	// creating an object of model
	const myBlog = new Blog({
		title: 'Blog num 5',
		snippet: 'Snippet of this blog',
		body: "The has to be a body, so here it is. But there also need some large amount of words to look like a paragraph, so here they are. Don't mind but now i have successfully wasted a lot of time of the person who is reading it."
	})

	myBlog.save()
		.then(result => {
			console.log("BLOG SAVED")
			res.send(result)
		})
		.catch(err => {
			console.log("ERROR SAVING THE BLOG : " + err)
		})
})


app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then(result => {
			console.log("FOUND THE BLOGS")
			res.send(result)
		})
		.catch(err => {
			console.log("NO BLOGS WITH THIS MODEL : " + err)
		})
})


app.get('/find-a-blog', (req, res) => {
	Blog.findById('putTheIDhere')
		.then(result => {
			res.send("A BLOG FOUND : " + result);
		})
		.catch(err => {
			console.log("BLOG NOT FOUND : " + err);
		});
});


app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: "About" })
})

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: "New" })
})

// Showing all blogs 
app.get('/blogs', (req, res) => {
	Blog.find().sort({ createdAt: -1 })
		.then(result => {
			res.render('index', { blogs: result, title: 'All blogs' });
		})
		.catch(err => {
			console.log(err);
		});
});

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: "err" })
})