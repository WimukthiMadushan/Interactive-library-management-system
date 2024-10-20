import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser,borrowBook,returnBook,renewBook,getBorrows,getExpiredBorrows, getOverdueBooks, bookVisualizeByCat } from "../Controllers/Borrow.js";

router.get("/", getBorrows);
router.get("/expired" , getExpiredBorrows);
router.get("/bookVisualizeByCat" , getBorrowsVisualize);
router.get("/:id", getBorrowBooksOfUser);
router.get("/overdue/:id", getOverdueBooks);
router.post('/',borrowBook);
router.put('/return/:id',returnBook);
router.put('/renew/:id',renewBook);


export default router;
