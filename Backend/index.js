import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./Routes/Auth.js";
import userRoutes from "./Routes/User.js";
import bookRoutes from "./Routes/Book.js";
import categoryRoutes from "./Routes/Category.js";
import publisherRoutes from "./Routes/Publishers.js";
import bookCopyRoutes from "./Routes/Book_Copy.js";
import reviewRoutes from "./Routes/Review.js";
import borrowRoutes from "./Routes/Borrow.js";
import reserveRoutes from "./Routes/Reserve.js";
import authorRoutes from "./Routes/Author.js";
import languageRoutes from "./Routes/Language.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

//Routes....
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/publisher", publisherRoutes);
app.use("/api/bookcopy", bookCopyRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/reserve", reserveRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/language", languageRoutes);
app.use("/books", express.static("books"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
