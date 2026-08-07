import { useEffect, useState } from "react";
import api from "../services/api";

function ReturnBook() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {

      const response = await api.get("/issues");

      setIssues(response.data.issues);

    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async (id) => {

    try {

      await api.put(`/issues/return/${id}`);

      alert("Book returned successfully.");

      fetchIssues();

    } catch (error) {

      alert(error.response?.data?.message || "Return failed.");

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Return Book</h2>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Member</th>

            <th>Book</th>

            <th>Due Date</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {issues.map((issue) => {

            const overdue =
              !issue.returned &&
              new Date(issue.dueDate) < new Date();

            return (

              <tr key={issue._id}>

                <td>{issue.member?.name}</td>

                <td>{issue.book?.title}</td>

                <td>
                  {new Date(issue.dueDate).toLocaleDateString()}
                </td>

                <td>

                  {issue.returned ? (

                    <span className="badge bg-success">
                      Returned
                    </span>

                  ) : overdue ? (

                    <span className="badge bg-danger">
                      Overdue
                    </span>

                  ) : (

                    <span className="badge bg-warning text-dark">
                      Issued
                    </span>

                  )}

                </td>

                <td>

                  {!issue.returned && (

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleReturn(issue._id)}
                    >
                      Return
                    </button>

                  )}

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}

export default ReturnBook;