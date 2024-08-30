import express from "express";
const router = express.Router();

import { getUsers, getUser, deleteUser } from "../Controllers/User.js";

router.get("/", getUsers);
router.get("/:id", getUser);
//router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
