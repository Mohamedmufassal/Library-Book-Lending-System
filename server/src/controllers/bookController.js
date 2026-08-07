import Book from "../models/Book.js";

// Add Book
export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, quantityAvailable } = req.body;

    if (!title || !author || !isbn) {
      return res.status(400).json({
        success: false,
        message: "Title, author and ISBN are required."
      });
    }

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "ISBN already exists."
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      quantityAvailable
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully.",
      book
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Book By ID
export const getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      book
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {

    const { title, author, isbn, quantityAvailable } = req.body;

    const existingBook = await Book.findById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const duplicateISBN = await Book.findOne({
      isbn,
      _id: { $ne: req.params.id }
    });

    if (duplicateISBN) {
      return res.status(400).json({
        success: false,
        message: "ISBN already exists"
      });
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.isbn = isbn;
    existingBook.quantityAvailable = quantityAvailable;

    await existingBook.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: existingBook
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Delete Book
export const deleteBook = async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};