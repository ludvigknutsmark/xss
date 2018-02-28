var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.key){
    res.redirect('welcome')
  }
  res.render('login', {});
});

router.get('/login', function(req, res, next){
  if(req.session.key){
    res.redirect('welcome')
  }
  else{
    res.render('login', {})
  }
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
        req.session.key=username;     
        res.redirect('welcome')
      }
      else{
        res.redirect('login')
      }
    }
  });
});

router.get('/logout', function(req,res,next){
  req.session.destroy(function(err){
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/')
    }
  });
});

router.get('/welcome', function(req,res,next){
  if(req.session.key){
    res.render('welcome', {username: req.session.key})
  } 
  else{
    res.redirect('login')
  }
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
