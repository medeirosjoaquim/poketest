import axios from "axios";
import db from "../db";

interface Pokemon {
  name: string;
  url: string;
  sprite: string; // URL to the sprite image
}

interface PokemonBrief {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBrief[];
  currentPage: number;
  totalPages: number;
}

export const getAllPokemons = async (
  page: number,
  limit: number
): Promise<PokemonApiResponse> => {
  const baseUrl = "http://localhost:3000/pokemon";
  const cacheQuery = db.prepare(`
    SELECT data FROM pokemon_cache 
    WHERE page = ? AND items_per_page = ? 
    AND timestamp > datetime('now', '-1 day')
  `);

  const cachedResult: { data: string } | undefined = cacheQuery.get(
    page,
    limit
  ) as { data: string } | undefined;

  if (cachedResult) {
    console.log("Returning cached data");
    return JSON.parse(cachedResult.data);
  }

  const offset = (page - 1) * limit;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await axios.get<{
      count: number;
      results: PokemonBrief[];
    }>(apiUrl);
    const { count, results } = response.data;

    const pokemonsWithSprites: Pokemon[] = await Promise.all(
      results.map(async (pokemon: PokemonBrief) => {
        const detailResponse = await axios.get<{
          sprites: { front_default: string };
        }>(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          sprite: detailResponse.data.sprites.front_default,
        };
      })
    );

    const totalPages = Math.ceil(count / limit);
    const currentPage = page;

    const next =
      page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;
    const previous =
      page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

    const fullApiResponse: PokemonApiResponse = {
      count,
      next,
      previous,
      results: pokemonsWithSprites,
      currentPage,
      totalPages,
    };

    const insertCache = db.prepare(`
      INSERT OR REPLACE INTO pokemon_cache (page, items_per_page, data, timestamp) 
      VALUES (?, ?, ?, datetime('now'))
    `);
    insertCache.run(page, limit, JSON.stringify(fullApiResponse));

    return fullApiResponse;
  } catch (error) {
    console.error("Failed to fetch Pokémon:", error);
    throw new Error("Failed to fetch data from Pokémon API");
  }
};
