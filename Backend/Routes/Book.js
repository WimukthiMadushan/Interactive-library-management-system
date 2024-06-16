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
  getBooksFromFloor,
  // getBooksFromDate,
  getBooksFromFilters,
  getBooksFromTitle,
  getBooksFromLanguage,
} from "../Controllers/Book.js";

router.get("/", getBooks);
router.get("/:id", getBook);
router.get("/title/:title", getBooksFromTitle);
router.get("/author/:author", getBooksFromAuthor);
router.get("/language/:language", getBooksFromLanguage);
router.get("/category/:category", getBooksFromCategory);
router.get("/isbn/:isbn", getBooksFromISBN);
router.get("/publisher/:publisher", getBooksFromPublisher);
router.get("/floor/:floor", getBooksFromFloor);
//router.get("/date/:date", getBooksFromDate);
router.post("/", addBook);
router.get("/filters", getBooksFromFilters);

router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
