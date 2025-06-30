import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
    deleteUser,
    getAllUsers,
  login,
  register,
  updateProfile,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", protect, updateProfile);
router.get("/all", protect, getAllUsers);
router.delete("/:id", protect, deleteUser);


export default router;
