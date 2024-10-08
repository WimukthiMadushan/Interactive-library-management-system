import express from "express";
const router = express.Router();

import {
  getTopAuthors,
  getTopPublishers,
  getBorrowedBooksInRange,
  bookVisualizeByCat,
  bookVisualizeByStates,
  reservebookVisualizeByCat
} from "../Controllers/Visualize.js";

router.get("/topauthors", getTopAuthors);
router.get("/toppublishers", getTopPublishers);
router.get("/borrowedbooks/:range", getBorrowedBooksInRange);
router.get("/bookvisualizebycat", bookVisualizeByCat);
router.get("/bookvisualizebystates", bookVisualizeByStates);
router.get("/reservebookvisualizebycat", reservebookVisualizeByCat);


export default router;