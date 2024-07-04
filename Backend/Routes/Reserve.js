import express from "express";
const router = express.Router();

import { getReserveBooksOfUser, reserveBook, getReserves} from "../Controllers/Reserve.js";

router.get("/", getReserves);
router.get("/:UserID", getReserveBooksOfUser);
router.post("/", reserveBook);


export default router;
