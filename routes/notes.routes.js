const express = require("express");
const router = express.Router();

const Note = require("../src/models/note.model");

// GET ALL NOTES
router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch notes",
    });
  }
});

// CREATE NOTE
router.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const isPresent = await Note.findOne({ title });

    if (isPresent) {
      return res.status(400).json({
        error: "Note with this title already exists",
      });
    }

    const newNote = await Note.create({
      title,
      content,
    });

    return res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// UPDATE NOTE
router.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// DELETE NOTE
router.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;