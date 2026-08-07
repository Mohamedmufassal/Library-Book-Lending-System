import Issue from "../models/Issue.js";
import Book from "../models/Book.js";
import Member from "../models/Member.js";

// Issue Book
export const issueBook = async (req, res) => {
  try {

    const { memberId, bookId, issueDate, dueDate } = req.body;

    if (!memberId || !bookId || !issueDate || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found."
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    if (book.quantityAvailable <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available."
      });
    }

    const alreadyIssued = await Issue.findOne({
      member: memberId,
      book: bookId,
      returned: false
    });

    if (alreadyIssued) {
      return res.status(400).json({
        success: false,
        message: "This member already has this book."
      });
    }

    const issue = await Issue.create({
      member: memberId,
      book: bookId,
      issueDate,
      dueDate
    });

    book.quantityAvailable -= 1;
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book issued successfully.",
      issue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Return Book
export const returnBook = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue record not found."
      });
    }

    if (issue.returned) {
      return res.status(400).json({
        success: false,
        message: "Book has already been returned."
      });
    }

    issue.returned = true;
    issue.returnDate = new Date();

    await issue.save();

    const book = await Book.findById(issue.book);

    if (book) {
      book.quantityAvailable += 1;
      await book.save();
    }

    res.status(200).json({
      success: true,
      message: "Book returned successfully.",
      issue
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getIssuedBooks = async (req, res) => {
  try {

    const issues = await Issue.find()
      .populate("member", "name")
      .populate("book", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      issues
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};