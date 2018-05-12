const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('expressjsapp', ['users']);
var ObjectId = mongojs.ObjectId

const app = express();

// View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  db.users.find(function (err, docs) {
  	//console.log(docs);
  	res.render('index', {
    	title: 'Users',
    	users: docs
  	});
  });
});

app.post('/users/add', function(req,res) {
	var newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	}
	db.users.insert(newUser, function(err, result){
		if (err) {
			console.log(err);
		}
		res.redirect('/');
	});
});

app.delete('/users/delete/:id', function(req, res) {
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result) {
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
