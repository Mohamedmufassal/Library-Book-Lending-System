import express from "express";
import protect from "../middleware/authMiddleware.js";
import { issueBook,returnBook,getIssuedBooks } from "../controllers/issueController.js";

const router = express.Router();

router.get("/",protect,getIssuedBooks);
router.post("/", protect, issueBook);
router.put("/return/:id",protect,returnBook);

export default router;