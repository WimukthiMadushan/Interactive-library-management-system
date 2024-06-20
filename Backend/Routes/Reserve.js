import express from "express";
const router = express.Router();

import { getReserveBooksOfUser, reserveBook } from "../Controllers/Reserve.js";

router.get("/:UserID", getReserveBooksOfUser);
router.post("/", reserveBook);

export default router;
