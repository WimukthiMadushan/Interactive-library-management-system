import express from "express";
const router = express.Router();

import {
  getAuthors,
  addAuthors,
  getAuthorById,
  updateAuthor,
} from "../Controllers/Author.js";

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/",addAuthors);
router.put("/:id",updateAuthor);


export default router;
