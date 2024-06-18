import express from "express";
const router = express.Router();

import {
  getBook,
  getBooksFromFilters,
  addBook,
  deleteBook,
} from "../Controllers/Book.js";

router.post("/", addBook);
router.get("/filters", getBooksFromFilters);
router.get("/:id", getBook);

router.delete("/:id", deleteBook);
//router.put("/:id", updateBook);

export default router;
