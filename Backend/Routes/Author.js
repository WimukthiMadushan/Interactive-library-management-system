import express from "express";
const router = express.Router();

import {
  getAuthors,
  addAuthors,
  getAuthorById,
  updateAuthor,
  removeAuthor,
} from "../Controllers/Author.js";

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", addAuthors);
router.put("/:id", updateAuthor);
router.delete("/:id", removeAuthor);

export default router;
