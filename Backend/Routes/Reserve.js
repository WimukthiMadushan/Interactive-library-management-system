import express from "express";
const router = express.Router();

import { getReserveBooksOfUser } from "../Controllers/Reserve.js";

router.get("/:UserID", getReserveBooksOfUser);

export default router;
