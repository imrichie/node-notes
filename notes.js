/*************************************
  Author: Richie Flores
  Name: notes.js
  Date: 04/01/2018
  Summary: Node taking app!
*************************************/
// Imports
const fs = require('fs');

// Dependant functions
const fetchNotes = () => {
  try {
      const noteString = fs.readFileSync('notes-data.json');
      return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const logNote = note => {
  console.log('-------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

// app.js functions
const addNote = (title, body) => {
  const note = { title, body };
  const notes = fetchNotes();
  const duplicateNotes = notes.filter(item => item.title === title);

  if (duplicateNotes.length === 0) {
      notes.push(note);
      saveNotes(notes);
      return note;
  }
};

const getAll = () => fetchNotes();

const getNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(item => item.title === title);

  return filteredNotes[0];
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(item => item.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

// exports
module.exports = { addNote, getAll, getNote, removeNote, logNote };
