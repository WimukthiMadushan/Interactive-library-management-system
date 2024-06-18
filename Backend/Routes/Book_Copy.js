import express from "express";
const router = express.Router();

import { getBookCopy } from "../Controllers/Book_Copy.js";

router.get("/:BookID", getBookCopy);

export default router;
