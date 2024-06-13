import express from "express";
import authRoutes from "./Routes/Auth.js";
import database from "./DataBase.js";

const app = express();
const port = 5000;
app.use(express.json());

//Routes....
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
