import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/notesController.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote );
router.put("/:id", updateNote );
router .delete("/:id", deleteNote );

export default router;


// app.get("/api/notes", (req, res) => {
//     res.status(200).send("hello");
// });

// app.post("api/notes", (req, res) => {
//     res.status(201).json({message: "post created successfully"});
// });

// app.put("api/notes/:id", (req, res) => {
//     res.status(200).json({message: "post updated successfully"});
// });     // https://localhost:5001/api/notes/21

// app.delete("api/notes:id", (req, res) => {
//     res.status(200).json({message: "post deleted successfully"});
// });