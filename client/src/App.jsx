import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      {localStorage.getItem("token") && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue-book"
          element={
            <ProtectedRoute>
              <IssueBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/return-book"
          element={
            <ProtectedRoute>
              <ReturnBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;