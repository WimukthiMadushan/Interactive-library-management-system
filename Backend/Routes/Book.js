import express from "express";
const router = express.Router();

import {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  addBook,
  getBooksFromAuthor,
  getBooksFromCategory,
  getBooksFromISBN,
  getBooksFromPublisher,
  getBooksFromYear,
  getBooksFromFilters,
  getBooksFromTitle,
  getBooksFromLanguage,
} from "../Controllers/Book.js";

router.get("/", getBooks);
router.get("/:id", getBook);
router.get("/title/:title", getBooksFromTitle);
router.get("/author/:author", getBooksFromAuthor);
router.get("/category/:category", getBooksFromCategory);
router.get("/isbn/:isbn", getBooksFromISBN);
router.get("/language/:language", getBooksFromLanguage);
router.get("/publisher/:publisher", getBooksFromPublisher);
router.get("/year/:year", getBooksFromYear);
router.get("/filters", getBooksFromFilters);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
