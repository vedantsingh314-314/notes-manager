const express = require("express");
const Note=require('./models/note.model.js');
const fs = require("fs");

const app = express();
const notesrouter=require("../routes/notes.routes.js");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/', notesrouter);
module.exports = app;
