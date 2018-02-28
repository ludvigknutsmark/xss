var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.key){
    res.redirect('welcome')
  }
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
        //Creates session
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
  //Check if session exists.
  if(req.session.key){
    res.render('welcome', {username: req.session.key})
  } 
  else{
    res.redirect('login')
  }
});

router.get('/register', function(req, res, next) {
  //var out  = render('ssti', { data: req.query.name});
  //console.log(out)
  //console.log(req.query.name)
  res.render('register');
  //res.render('register', { data: req.query.name});
  var db = req.db;
  //var data = db.get('test');
  //var userName = req.query.name;
  //var password = req.query.pw;
  var userName = req.body.name;
  var password = req.body.pw;
  console.log(userName);
  //data.insert({"name" : userName}, function(err, doc){
  //  db.close();
  //  if (err) throw err;
  //  else{
  //    res.redirect('dbget')
  //  }
  //});
  db.close();
});

module.exports = router;
