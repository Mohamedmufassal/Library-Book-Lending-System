import Book from "../models/Book.js";
import Member from "../models/Member.js";
import Issue from "../models/Issue.js";

export const getDashboard = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalMembers = await Member.countDocuments();

    const booksIssued = await Issue.countDocuments({
      returned: false
    });

    const today = new Date();

    const overdueBooks = await Issue.countDocuments({
      returned: false,
      dueDate: { $lt: today }
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalBooks,
        totalMembers,
        booksIssued,
        overdueBooks
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
