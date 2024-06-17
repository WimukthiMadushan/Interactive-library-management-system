import express from "express";
const router = express.Router();

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../Controllers/Category.js";

router.get("/", getCategories);

export default router;
