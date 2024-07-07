import express from "express";
import {
  register,
  login,
  adminLogin,
  receptionLogin,
} from "../Controllers/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", adminLogin);
router.post("/receptionlogin", receptionLogin);

export default router;
