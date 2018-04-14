const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// const _ = require('lodash');
// const fs = require('fs');
// const os = require('os');

// const user = os.userInfo();


// fs.appendFile('greeting.pdf', `This is a greeting from ${user.username}`, (err) => {
// 	if(err) {
// 		console.log('error occurred');
// 	}
// })

// const str = 'abs';
// const testStr = _.isString(str);
// console.log(testStr);

// const arr = _.chunk(['a', 'b', 'c', 'd'], 2);
// console.log(arr);

const command = process.argv[2];

	if(command === 'add') {
		console.log('Adding notes');
	}else if (command === 'remove') {
		console.log('Removing notes');
	}else if (command === 'read'){
		console.log('Reading notes');
	}else if(command === 'list') {
		console.log('Listing all lists');
	}else {
		console.log('Command not recognized.');
	}
 

// ==========================================================
// 		 									DATABASE
// ==========================================================

	// Use global promise instead of mongoose.
	mongoose.Promise = global.Promise;

	// mongoose.connect(config.uri, {useMongoClient: true}, (err) => {
	// 	if(err){
	// 		console.log('Could not connect to database', err);
	// 	}else {
	// 		console.log('Connected to datase ' + config.db);
	// 	}
	// })


// ==========================================================
// 		 									MIDDLEWARES
// ==========================================================

	app.use(bodyParser.urlencoded({ extended: false }));
	// app.use('/uploads', express.static('uploads'));
	app.use(express.static(__dirname + '/dist')); 
	app.use(bodyParser.json());
	

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
		  "Access-Control-Allow-Headers",
		  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
		  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
		  return res.status(200).json({});
		}
		next();
	  });




// ==========================================================
// 		 									ROUTES
// ==========================================================

	// app.use('/contact', contactRoute)

	// Other routes goes to the client side.
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/dist/index.html'));
	});



// ==========================================================
// 		 									SERVER
// ==========================================================

	const port = process.env.PORT || 8080;

	app.listen(port, () => {
		console.log(`Connected to port ${port}`);
	})
