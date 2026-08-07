import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bookRoutes from "./routes/bookRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/issues",issueRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Book Lending System API is Running"
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;