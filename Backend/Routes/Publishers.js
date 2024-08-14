import express from "express";
const router = express.Router();

import {
  getPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
  getPublisherById,
} from "../Controllers/Publishers.js";

router.get("/", getPublishers);
router.get("/:id", getPublisherById);
router.post("/", createPublisher);
router.put("/:id", updatePublisher);
router.delete("/:id", deletePublisher);

export default router;
