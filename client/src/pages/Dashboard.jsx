import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalBooks: 0,
    totalMembers: 0,
    booksIssued: 0,
    overdueBooks: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const response = await api.get("/dashboard");

      setDashboard(response.data.dashboard);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        📚 Library Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">

              <h5>Total Books</h5>

              <h2>{dashboard.totalBooks}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">

              <h5>Total Members</h5>

              <h2>{dashboard.totalMembers}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">

              <h5>Books Issued</h5>

              <h2>{dashboard.booksIssued}</h2>

            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">

              <h5>Overdue Books</h5>

              <h2>{dashboard.overdueBooks}</h2>

            </div>
          </div>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;