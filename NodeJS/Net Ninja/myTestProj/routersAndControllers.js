const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();

// const config = require('./config')
const DBname = 'firstTest'

const app = express();

// const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.pyrexfq.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pyrexfq.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbURI)
	.then(result => {
		app.listen(process.env.PORT || 3000)
		console.log("CONNECTED SUCCESSFULLY TO DB")
	})
	.catch(err => console.log("FAILED TO CONNECT TO DB : \n" + err))

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(morgan('dev'))
app.use(express.urlencoded())

app.use((req, res, next) => {
	console.log("New request made")
	console.log("host : ", req.hostname)
	console.log("path : ", req.path)
	console.log("method : ", req.method)
	next()
})



app.get('/', (req, res) => {
	res.redirect('/blogs')
})


app.use('/blogs', blogRoutes)


app.get('/about', (req, res) => {
	res.render('about', { title: "About" })
})


// 404
app.use((req, res) => {
	res.status(404).render('404', { title: "err" })
})