var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.get('/dbinsert', function(req,res,next){
  var db = req.db;
  var data = db.get('users');
  var userName = req.query.name;
  data.insert({"name" : userName}, function(err, doc){
    db.close();
    if (err) throw err;
    else{
      res.redirect('dbget')
    }
  });
});

router.get('/login', function(req, res, next){
  res.render('login', {})
});

router.post('/loginuser', function(req,res,next){
  var db = req.db;
  var data = db.get('users');
  var username = req.body.username;
  var password = req.body.password

  data.findOne({"username" : username, "password" : password}, function(err, result){
    db.close()
    if (err) throw err;
    else{
      if (result != null){
        res.redirect('welcome?username='+result.username)
      }
      else{
        res.redirect('users')
      }
    }
  });
});

router.get('/welcome', function(req,res,next){
  var username = req.query.username;
  /* Check if cookie for username or user exist */
  
  res.render('welcome', {username: username})
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.post('/addUser', function(req, res, next) {
	var db = req.db;
	var collection = db.get('users');
	var userName = req.body.name;
	var password = req.body.password;
	collection.insert({"username" : userName, "password" : password}, function(err, doc){
		db.close();
		if (err) throw err;
		else{
      			res.redirect('login');
   		 }
	});
});

module.exports = router;
