import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addMember,
  getMembers
} from "../controllers/memberController.js";

const router = express.Router();

router.route("/")
  .post(protect, addMember)
  .get(protect, getMembers);

export default router;