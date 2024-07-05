import express from "express";
import { register, login, adminLogin } from "../Controllers/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", adminLogin);

export default router;
