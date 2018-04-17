const notes = require('./notes');
const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const notesOptions = {
	titleOptions: {
		describe: 'Add Title',
		demand: true,
		alias: 't'
	},

	bodyOptions: {
		describe: 'Add Body',
		demand: true,
		alias: 'b'
	}
}


const argv = yargs
.command('add', 'Add New Note', {
	title: notesOptions.titleOptions,
	body: notesOptions.bodyOptions
})
.command('list', 'Listing all notes')
.command('read', 'Reading list', { title: notesOptions.titleOptions })
.command('remove', 'Removing List', { title: notesOptions.titleOptions })
.help()
.argv

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

const command = argv._[0];


if (command === 'add') {
	let note = notes.addNote(argv.title, argv.body);
	if(note){
		notes.logNote(note);
	}else {
		console.log('Note is already taken');
	}
} else if (command === 'remove') {
	let noteDeleted = notes.removeNote(argv.title);
	let message = noteDeleted ? 'Note successfully deleted.' : 'Note was not found.';
	console.log(message);
} else if (command === 'read') {
	let oneNote = notes.getNote(argv.title);
	if(oneNote) {
		notes.logNote(oneNote);
	}else {
		console.log('Note was not found.');
	}
} else if (command === 'list') {
	let allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes.`);
	allNotes.forEach(note => notes.logNote(note));
} else {
	console.log('Command not recognized.');
}