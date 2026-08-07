import express from "express";
import { addBook,getBooks,getBookById,updateBook,deleteBook } from "../controllers/bookController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
 .post(protect, addBook)
 .get(protect, getBooks);

 router.route("/:id")
 .get(protect, getBookById)
 .put(protect, updateBook)
 .delete(protect, deleteBook);

export default router;