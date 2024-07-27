import express from "express";
import { getAll } from "../controllers/pokemon.controller";
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/pokemon");
});

router.get("/pokemon", getAll);
export default router;
