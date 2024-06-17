import express from "express";
const router = express.Router();

import {
  getPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../Controllers/Publishers.js";

router.get("/", getPublishers);
router.post("/", createPublisher);
router.put("/:id", updatePublisher);
router.delete("/:id", deletePublisher);

export default router;
