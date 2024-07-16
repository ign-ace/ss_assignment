import express from "express";
import {
  adminGetAllUser,
  deleteUser,
  getUserByID,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticateToken, isAdmin } from "../middlewares/authentication.js";

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", authenticateToken, getUserByID);
router.put("/user/:id", authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, deleteUser);

//admin route
router.get("/admin", authenticateToken, isAdmin, adminGetAllUser);

export default router;
