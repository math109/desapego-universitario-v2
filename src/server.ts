import "dotenv/config";
import express from "express";
import cors from "cors";
import anunciosRouter from "./routes/anuncios";
import usuariosRouter from "./routes/usuarios";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuariosRouter);
app.use("/anuncios", anunciosRouter);

const PORT = process.env.PORT || 3333;
app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});