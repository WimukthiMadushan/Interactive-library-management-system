import express from "express";
const router = express.Router();

import { getBookCopy,addBookCopies } from "../Controllers/Book_Copy.js";

router.get("/:BookID", getBookCopy);
router.post("/", addBookCopies);

export default router;
