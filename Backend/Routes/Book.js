import express from "express";
const router = express.Router();
import multer from "multer";

import {
  getBook,
  getBooksFromFilters,
  addBook,
  deleteBook,
  getBookNames,
  getBookList,
  updateBook,
  getBooksFromAdvancedFilters
} from "../Controllers/Book.js";

// image storage engine for store images at uploads
const storage = multer.diskStorage({
  destination: "books",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.put("/:id", upload.single("uploaded_file"), updateBook);
router.post("/", upload.single("uploaded_file"), addBook);
router.post("/advanced", getBooksFromAdvancedFilters);
router.get("/filters", getBooksFromFilters);
router.get("/list", getBookList);
router.get("/:id", getBook);
router.get("/", getBookNames);
router.delete("/:id", deleteBook);

export default router;
