import express from "express";
const router = express.Router();

import {
  getBooksFromFilters,
  addBook,
  deleteBook,
} from "../Controllers/Book.js";

router.post("/", addBook);
router.get("/filters", getBooksFromFilters);
router.delete("/:id", deleteBook);
//router.put("/:id", updateBook);

export default router;
