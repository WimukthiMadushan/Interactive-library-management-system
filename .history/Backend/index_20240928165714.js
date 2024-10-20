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

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Route handlers
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

// Serve static files
app.use("/books", express.static("books"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
