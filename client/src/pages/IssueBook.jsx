import { useEffect, useState } from "react";
import api from "../services/api";

function IssueBook() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    memberId: "",
    bookId: "",
    issueDate: "",
    dueDate: ""
  });

  useEffect(() => {
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data.members);
    } catch (error) {
      console.log(error);
    }
  };

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
      await api.post("/issues", formData);

      alert("Book issued successfully.");

      setFormData({
        memberId: "",
        bookId: "",
        issueDate: "",
        dueDate: ""
      });

      fetchBooks();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to issue book.");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Issue Book</h2>

      <div className="card">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">Member</label>

              <select
                className="form-select"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                required
              >
                <option value="">Select Member</option>

                {members.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                ))}

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">Book</label>

              <select
                className="form-select"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                required
              >
                <option value="">Select Book</option>

                {books.map((book) => (
                  <option
                    key={book._id}
                    value={book._id}
                  >
                    {book.title} ({book.quantityAvailable})
                  </option>
                ))}

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Issue Date
              </label>

              <input
                type="date"
                name="issueDate"
                className="form-control"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                className="form-control"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />

            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Issue Book
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default IssueBook;