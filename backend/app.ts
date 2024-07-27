import express from "express";
import cors from "cors";
import pokemonRouter from "./routes/pokemon.routes";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", pokemonRouter);
export default app;
