import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./Routes/Auth.js";
import userRoutes from "./Routes/User.js";
import bookRoutes from "./Routes/Book.js";
import categoryRoutes from "./Routes/Category.js";
import publisherRoutes from "./Routes/Publishers.js";
import bookCopyRoutes from "./Routes/Book_Copy.js";
import reviewRoutes from "./Routes/Review.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//Routes....
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/publisher", publisherRoutes);
app.use("/api/bookcopy", bookCopyRoutes);
app.use("/api/review", reviewRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
