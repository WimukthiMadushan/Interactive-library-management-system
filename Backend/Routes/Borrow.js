import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser,borrowBook,returnBook,renewBook } from "../Controllers/Borrow.js";

router.get("/:id", getBorrowBooksOfUser);
router.post('/',borrowBook);
router.post('/return',returnBook);
router.post('/renew',renewBook);

export default router;
