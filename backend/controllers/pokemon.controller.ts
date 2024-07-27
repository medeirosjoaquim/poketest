import { Request, Response } from "express";
import { getAllPokemons } from "../services/pokemon.service";

export const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const result = await getAllPokemons(page, limit);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
