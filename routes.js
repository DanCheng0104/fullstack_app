var express = require('express');
var router = express.Router();
var db = require('./query');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/puppies', db.getAllPuppies);

module.exports = router;