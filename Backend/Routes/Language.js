import express from "express";
const router = express.Router();
import { getLanguages } from "../Controllers/Language.js";

router.get("/", getLanguages);

export default router;
