import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./Routes/Auth.js";
import userRoutes from "./Routes/User.js";
import bookRoutes from "./Routes/Book.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());

//Routes....
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
