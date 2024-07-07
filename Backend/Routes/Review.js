import express from "express";
const router = express.Router();

import {
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../Controllers/Review.js";

router.get("/:BookID", getReview);
router.post("/:BookID", createReview);
router.put("/:BookID", updateReview);
router.delete("/:BookID", deleteReview);

export default router;
