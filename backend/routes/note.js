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

module.exports = router;
