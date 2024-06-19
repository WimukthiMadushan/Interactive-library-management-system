import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser } from "../Controllers/Borrow.js";

router.get("/:id", getBorrowBooksOfUser);

export default router;
