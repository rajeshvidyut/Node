const express = require('express');
const path = require('path');
const mongoose = require('mongoose');3
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
// Database Connection
mongoose.connect('mongodb://localhost/nodekb',{ useMongoClient: true });
let db = mongoose.connection;

//  Initiate express framework
const app = express();

// Bring in Models
let Article = require('./models/article');

// Load View Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
	Article.find({}, function(err,articles){
		if (err) {
			console.log(err)
		}else{
			res.render('index',{
				title:'Article',
				articles: articles
			});
		}	
	});
});

// View Single Page 
app.get('/article/:id', function(req,res){
	Article.findById(req.params.id,function(err,article){
		res.render('article',{
			article:article
		});
	});
});

// Add Article Page Heading
app.get('/articles/add', function(req,res){
	res.render('add_article',{
		title:'Add Article'
	});
});	

// Add Article Page Function
app.post('/articles/add', function(req,res){
	let article = new Article();
	article.title = req.body.title;
	article.author= req.body.author;
	article.body = req.body.body;
	article.save(function(err){
		if (err) {
			console.log(err);
			return
		}else{
			res.redirect('/');
		}
	})
	console.log(req.body.title);
	return;
});

// Edit Article Page
app.get('/article/edit/:id', function(req,res){
	Article.findById(req.params.id,function(err,article){
		res.render('edit_article',{
			title  :'Edit Article',
			article:article
		});
	});
});

// Edit Article Page Function
app.post('/articles/edit/:id', function(req,res){
	let article = {};
	article.title = req.body.title;
	article.author= req.body.author;
	article.body = req.body.body;

	let query = {_id:req.params.id}

	Article.update(query,article, function(err){
		if (err) {
			console.log(err);
			return
		}else{
			res.redirect('/');
		}
	})
	console.log(req.body.title);
	return;
});

//DELETE
app.delete('/article/:id', function(req, res){
	let query = {_id:req.params.id}

	Article.remove(query,function(err){
		if (err) {
			console.log(err);
		}
		res.send('Success');
	})
}) 

app.listen(3000, function(){
	console.log('Server Started');
})