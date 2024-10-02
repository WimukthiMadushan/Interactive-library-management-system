import express from "express";
const router = express.Router();

import {
  getReserveBooksOfUser,
  reserveBook,
  getReserves,
  deleteReserve,
  reservebookVisualizeByCat,
} from "../Controllers/Reserve.js";

router.get("/", getReserves);
router.get('/reservebookVisualizeByCat',reservebookVisualizeByCat);
router.get("/:UserID", getReserveBooksOfUser);
router.post("/", reserveBook);
router.delete("/cancel/:id", deleteReserve);

export default router;
