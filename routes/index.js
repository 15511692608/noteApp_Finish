var express = require('express');
var router = express.Router();
// mongodb
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('note', {  });
});

module.exports = router;