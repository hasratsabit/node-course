
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
    console.log('Getting all notes');
}

const getNote = (title) => {
    console.log('Getting note', title);
}

const removeNote = (title) => {
    let notesList = fetchNotes();
    let deleteNote = notesList.filter((note) => note.title !== title);
    saveNotes(deleteNote);

    return notesList.length !== deleteNote.length;
}
 

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}