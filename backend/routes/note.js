const express = require("express");
const fetchUserDetails = require("../middleware/fetchUserDetails");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route 1: To fetch all the notes of currently logged in user
router.get("/fetchnotes", fetchUserDetails, async (request, response) => {
  try {
    const note = await Note.find({ user: request.user.id });
    response.json(note);
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// Route 2: Saving a note for currently logged in user
router.post(
  "/addnote",
  [
    [
      check("title", "Title should be at least 3 characters long").isLength({
        min: 3,
      }),
      check(
        "description",
        "Description should be at least 5 characters long"
      ).isLength({ min: 5 }),
    ],
  ],
  fetchUserDetails,
  async (request, response) => {
    try {
      const { title, description, tag } = request.body;
      // If there are errors
      const erros = validationResult(request);
      if (!erros.isEmpty()) {
        return response.status(400).json({ erros: erros.array() });
      }
      const note = await Note({
        title,
        description,
        tag,
        user: request.user.id,
      });
      const savedNote = await note.save();
      response.json(savedNote);
    } catch (error) {
      console.error(error.message);
      response.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Updating an existing note for currently logged in user
router.put("/updatenote/:id", fetchUserDetails, async (request, response) => {
  try {
    const { title, description, tag } = request.body;
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // To check whether note exists or not
    const note = await Note.findById(request.params.id);
    if (!note) {
      return response
        .status(404)
        .send("Note not found with id " + request.params.id);
    }

    // To check whether the user is the owner of the note or not
    if (note.user.toString() !== request.user.id) {
      return response
        .status(401)
        .send("You are not authorized to modify this note");
    }

    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { $set: newNote },
      { new: true }
    );
    response.json({ updatedNote });
  } catch (error) {
    console.error(error.message);
    response.status(500).send("Internal Server Error");
  }
});

// Route 4: Deleting an existing note for the currently logged in user
router.delete(
  "/deletenote/:id",
  fetchUserDetails,
  async (request, response) => {
    try {
      // To check whether note exists or not
      const note = await Note.findById(request.params.id);
      if (!note) {
        console.log("inside if");
        return response
          .status(404)
          .send("Note not found with id " + request.params.id);
      }

      // To check whether the user is the owner of the note or not
      if (note.user.toString() !== request.user.id) {
        return response
          .status(401)
          .send("You are not authorized to modify this note");
      }

      await Note.findByIdAndDelete(request.params.id);
      response.json({ success: "Deleted note with id " + note.id, note: note });
    } catch (error) {
      console.error(error.message);
      response.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
