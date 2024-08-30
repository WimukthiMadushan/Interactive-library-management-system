import express from "express";
const router = express.Router();

import {
  getReserveBooksOfUser,
  reserveBook,
  getReserves,
  deleteReserve,
  extendReserve,
} from "../Controllers/Reserve.js";

router.get("/", getReserves);
router.get("/:UserID", getReserveBooksOfUser);
router.post("/", reserveBook);
router.delete("/cancel/:id", deleteReserve);
router.put("/extend/:id", extendReserve);

export default router;
