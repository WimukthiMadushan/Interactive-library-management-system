import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser,borrowBook,returnBook,renewBook,getBorrows,getEBorrows } from "../Controllers/Borrow.js";

router.get("/", getBorrows);
router.get("/expired" , getEBorrows);
router.get("/:id", getBorrowBooksOfUser);
router.post('/',borrowBook);
router.put('/return/:id',returnBook);
router.put('/renew/:id',renewBook);


export default router;
