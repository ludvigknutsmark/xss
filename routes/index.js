var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req,res,next){
  res.render('test', { data: req.query.name});
});

router.get('/dbget', function(req,res,next){
  var db = req.db;
  var data = db.get('test');
  data.findOne({}, function(err,result){
    if (err) throw err;
    db.close();
    res.render('dbtest', { title: result.name})
  });
});

router.get('/dbinsert', function(req,res,next){
  var db = req.db;
  var data = db.get('test');
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
  var data = db.get('login');
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
        res.redirect('login')
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
	var password = req.body.pw;
	db.close();
	data.insert({"username" : userName, "password" : password}, function(err, doc){
		db.close();
		if (err) throw err;
		else{
      			res.redirect('login');
   		 }
	});
});

/*router.get('/ssti', function(req, res, next) {
  //var out  = render('ssti', { data: req.query.name});
  //console.log(out)
  console.log(req.query.name)
  res.render('ssti', { data: req.query.name});
});
*/

module.exports = router;
