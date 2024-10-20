import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser,borrowBook,returnBook,renewBook,getBorrows,getEBorrows } from "../Controllers/Borrow.js";

router.get("/hi", getBorrows);
router.get("/:id", getBorrowBooksOfUser);
router.post('/',borrowBook);
router.put('/return/:id',returnBook);
router.put('/renew/:id',renewBook);
router.get("/expired" , getEBorrows);

export default router;
