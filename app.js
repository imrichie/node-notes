/*************************************
  Author: Richie Flores
  Name: app.js
  Date: 04/01/2018
  Summary: Node taking app!
*************************************/
// import dependencies
const yargs = require('yargs');

// ext. files
const notes = require('./notes');

// title options
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

// body options
const bodyOptions = {
  describe: 'Title of body',
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('read', 'Read a note', {
  title: titleOptions
})
.command('remove', 'Remove a note', {
  title: titleOptions
})
.command('list', 'List all notes')
.help()
.argv;
const command = argv._[0];

if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Fetching ${allNotes.length} note(s)...`);
  for (const note of allNotes) notes.logNote(note);
} else if
(command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note Created');
    notes.logNote(note);
  } else console.log('Title already exists');
} else if
  (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log('Note Found');
    notes.logNote(note);
  } else console.log('Note not found');
} else if
  (command === 'remove') {
  const removedNotes = notes.removeNote(argv.title);
  const message = removedNotes ? 'Note Removed' : 'Note not found';
  console.log(message);
} else (console.log('Command not found'));
