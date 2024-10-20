import express from "express";
const router = express.Router();

import { getUsers, getUser, deleteUser,getStaff, updateStaff,createStaff, deleteStaff } from "../Controllers/User.js";

router.get("/", getUsers);
router.get("/staff", getStaff);
router.get("/:id", getUser);
router.put("/staff/:id", updateStaff);
//router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/addstaff", createStaff);
router.delete("/staff/:id", deleteStaff);

export default router;
