const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')

const config = require('./config')

const app = express();

const dbURI = `mongodb+srv://${config.username}:${config.password}@cluster0.pyrexfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


app.set('view engine', 'ejs')

app.listen(3000);

const blogs = [
    {title: "rydtfgesdrg", snippet: "rsg etyhg erdth getdr hgertdhr tdhgetdhg estdrg etdwer"},
    {title: "rtedhfgsdg", snippet: "edrg etsh ghretdh retdhgb rdsthg rethge dthredth ewtdrh et"},
    {title: "tedhgedstg", snippet: "tejtruyjhgewytuj tr yjhgdr etryhgwest hkrtdstyrtu ery yuer6sdut tf"}
]

app.use((req, res, next) => {
	console.log("New request made")
	console.log("host : ", req.hostname)
	console.log("path : ", req.path)
	console.log("method : ", req.method)
	next()
})


app.use(morgan('dev'))

app.get('/', (req, res) => {
	res.render('index', {title : "Home", blogs});   // EJS automatically looks for these file names in views folder
})

app.get('/about', (req, res) => {
	res.render('about', {title : "About"})
    // Along with file name we can pass an object which contains variables which can be accessed by ejs present inside those files
})

app.get('/blogs/create', (req, res) => {
	res.render('create', {title : "New"})
})

// 404
app.use((req, res) => {
	res.status(404).render('404', {title : "err"})
})