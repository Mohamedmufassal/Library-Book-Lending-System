import { useEffect, useState } from "react";
import api from "../services/api";

function Books() {

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
  title: "",
  author: "",
  isbn: "",
  quantityAvailable: ""
});
const [editingBookId,setEditingBookId] = useState(null);


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {

      const response = await api.get("/books");

      setBooks(response.data.books);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingBookId) {
  await api.put(`/books/${editingBookId}`, formData);
  } else {
  await api.post("/books", formData);
  }

   alert(
  editingBookId
    ? "Book updated successfully."
    : "Book added successfully."
  );
    setFormData({
      title: "",
      author: "",
      isbn: "",
      quantityAvailable: ""
    });

    setShowForm(false);
    setEditingBookId(null);

    fetchBooks();

  } catch (error) {

    alert(error.response?.data?.message || "Failed to add book.");

  }
};

const handleEdit = (book) => {
  setEditingBookId(book._id);

  setFormData({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    quantityAvailable: book.quantityAvailable
  });

  setShowForm(true);
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await api.delete(`/books/${id}`);

    alert("Book deleted successfully.");

    fetchBooks();

  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete book.");
  }
};

const filteredBooks = books.filter((book) =>
  book.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Books Management</h2>

        <button className="btn btn-primary"
        onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add Book"}
        </button>

      </div>
      
      {showForm && (

     <div className="card mb-4">

    <div className="card-body">

    <h4 className="mb-3">{editingBookId ? "Edit Book" : "Add New Book"}</h4>

    <form onSubmit={handleSubmit}>

    <div className="row">

    <div className="col-md-6 mb-3">
    <input
    type="text"
    name="title"
    placeholder="Title"
    className="form-control"
    value={formData.title}
    onChange={handleChange}
    required
    />
    </div>

    <div className="col-md-6 mb-3">
    <input
    type="text"
    name="author"
    placeholder="Author"
    className="form-control"
    value={formData.author}
    onChange={handleChange}
    required
    />
    </div>

    <div className="col-md-6 mb-3">
    <input
    type="text"
    name="isbn"
    placeholder="ISBN"
    className="form-control"
    value={formData.isbn}
    onChange={handleChange}
    required
    />
    </div>

    <div className="col-md-6 mb-3">
    <input
    type="number"
    name="quantityAvailable"
    placeholder="Quantity Available"
    className="form-control"
    value={formData.quantityAvailable}
    onChange={handleChange}
    required
    min="0"
   />
   </div>

   </div>

   <button
   className="btn btn-success"
   type="submit"
   > {editingBookId ? "Update Book" : "Save Book"}
   </button>

   </form>

   </div>

   </div>

   )} 


   <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search books by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Title</th>

            <th>Author</th>

            <th>ISBN</th>

            <th>Available</th>

            <th width="180">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredBooks.length === 0 ? (

            <tr>

              <td colSpan="5" className="text-center">

                No books found

              </td>

            </tr>

          ) : (

            filteredBooks.map((book) => (

              <tr key={book._id}>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.isbn}</td>

                <td>{book.quantityAvailable}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2" 
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default Books;