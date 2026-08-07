import { useEffect, useState } from "react";
import api from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");
      setMembers(response.data.members);
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

      await api.post("/members", formData);

      alert("Member added successfully.");

      setFormData({
        name: "",
        email: "",
        phone: ""
      });

      setShowForm(false);

      fetchMembers();

    } catch (error) {

      alert(error.response?.data?.message || "Failed to add member.");

    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Member Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Add Member"}
        </button>

      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search member..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showForm && (

        <div className="card mb-4">

          <div className="card-body">

            <h4>Add Member</h4>

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <button
                className="btn btn-success"
                type="submit"
              >
                Save Member
              </button>

            </form>

          </div>

        </div>

      )}

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

          </tr>

        </thead>

        <tbody>

          {filteredMembers.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                className="text-center"
              >
                No members found
              </td>

            </tr>

          ) : (

            filteredMembers.map((member) => (

              <tr key={member._id}>

                <td>{member.name}</td>
                <td>{member.email}</td>

                <td>{member.phone}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Members;