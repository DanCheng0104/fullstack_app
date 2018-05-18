var express = require('express');
var router = express.Router();
var db = require('./query');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/nbs', db.getAllNbs);
router.get('/api/all', db.getAllData);
router.get('/api/summary', db.getSummaryInfo);


module.exports = router;