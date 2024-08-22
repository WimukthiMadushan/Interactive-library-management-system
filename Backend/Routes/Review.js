import express from "express";
const router = express.Router();

import {
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../Controllers/Review.js";

router.post("/", createReview);
router.get("/:BookID", getReview);
router.put("/:BookID", updateReview);
router.delete("/:BookID", deleteReview);

export default router;
