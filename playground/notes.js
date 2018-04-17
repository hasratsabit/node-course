
const fs = require('fs');

let fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}


let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    }

    let duplicateNote = notes.filter((note) => note.title === title);

    if(duplicateNote.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

const getAll = () => {
    let allNotes = fetchNotes();
    return allNotes;
}

const getNote = (title) => {
    // 1. Get the notes array.
    let notesList = fetchNotes();
    // 2. Filter notes and find the one with specified title.
    let filteredNotes = notesList.filter((note) => note.title === title);
    // 3. Return the the note
    return filteredNotes[0];
}

const removeNote = (title) => {
    let notesList = fetchNotes();
    let deleteNote = notesList.filter((note) => note.title !== title);
    saveNotes(deleteNote);

    return notesList.length !== deleteNote.length;
}

const logNote = (note) => {
    debugger;
    console.log('Note found');
    console.log('-----');
    console.log(`Title: ${note.title}`);
    console.log(`Title: ${note.body}`);
}
 

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}