import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./Routes/Auth.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());

//Routes....
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
