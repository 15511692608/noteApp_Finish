var express = require('express');
var router = express.Router();
// mongodb
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://localhost:27017/notedb';
// insert method
var insertDocuments = function(db,data,col,callback) {
	// Get the documents collection
	var collection = db.collection(col);
	// Insert some documents
	collection.insertMany([data], function(err, result) {
		assert.equal(err, null);
		callback(result);
	});
}
// find documents
var findDocuments = function(db,col,callback,filterJson={}) {
	// Get the documents collection
	var collection = db.collection(col);
	// Find some documents
	collection.find(filterJson).toArray(function(err, docs) {
		assert.equal(err, null);
		docs.sort(function(a,b){return b.time.replace(/\-/g,'') - a.time.replace(/\-/g,'');});
		callback(docs);
	});
}
// remove docs
var removeDocument = function(db,removeJson,col,callback) {
	// Get the documents collection
	var collection = db.collection(col);
	// or use methode: remove
	collection.deleteOne(removeJson, function(err, result) {
		assert.equal(err, null);
		callback(result);
	}); 
}
// update docs
var updateDocument = function(db,updateJson,setJson,col,callback) {
	// Get the documents collection
	var collection = db.collection(col);
	// Update document
	collection.updateMany(updateJson
	, { $set: setJson }, function(err, result) {
		assert.equal(err, null);
		callback(result);
	}); 
}

/* GET home page. */
/*
mongodb test
 */
router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findDocuments(db,'col',function(allDocs) {
			res.render('index', { title: 'Express', data: '数据', dbdata:allDocs });
			db.close();
		});
	});
});

router.post('/add',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		insertDocuments(db,req.body,'col',function(result) {
			let filterJson = {name1Date:req.body.name1Date};
			findDocuments(db,'col',function(allDocs) {
				res.render('index', { title: 'Express', data: JSON.stringify(result), dbdata:allDocs });
				db.close();
			},filterJson);
		});
	});
});

router.post('/del',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		let removeJson = {'_id': new ObjectID(req.body.id)};
		removeDocument(db,removeJson,'col',function(result) {
			findDocuments(db,'col',function(allDocs) {
				res.render('index', { title: 'Express', data: JSON.stringify(result), dbdata:allDocs });
				db.close();
			});
		});
	});
});

router.post('/update',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		let updateJson = {'name1Date':req.body.udpName1Date};
		let setJson = {'name2Date':req.body.udpName2Date};
		updateDocument(db, updateJson, setJson,'col',function(result) {
			let filterJson = {'name1Date':req.body.udpName1Date};
			findDocuments(db,'col',function(allDocs) {
				res.render('index', { title: 'Express', data: JSON.stringify(result), dbdata:allDocs });
				db.close();
			},filterJson);
		});
	});
});
/*
note opp
 */
router.get('/getAllNote',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url,function(err, db) {
		assert.equal(null, err);
		findDocuments(db,'note',function(allDocs) {
			db.close();
			res.json(allDocs);
		});
	});
});

router.post('/getNote',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url,function(err, db) {
		assert.equal(null, err);
		let filterJson = {'_id':new ObjectID(req.body._id)};
		findDocuments(db,'note',function(allDocs) {
			db.close();
			res.json(allDocs);
		},filterJson);
	});
});

router.post('/addNote',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		insertDocuments(db,req.body,'note',function(result) {
			db.close();
			res.json(result);
		});
	});
});

router.post('/delNote',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		let removeJson = {'_id': new ObjectID(req.body._id)};
		removeDocument(db,removeJson,'note',function(result) {
			db.close();
			res.json(result);
		});
	});
});

router.post('/editNote',function(req, res, next) {
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
		let updateJson = {'_id':new ObjectID(req.body._id)};
		let setJson = {'time':req.body.time,'content':req.body.content,'name':req.body.name,'sts':req.body.sts};
		updateDocument(db, updateJson, setJson,'note',function(result) {
			db.close();
			res.json(result);
		});
	});
});
module.exports = router;