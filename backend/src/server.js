import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🔥 Servidor rodando na porta ${port}`));
