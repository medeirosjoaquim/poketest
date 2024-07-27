export interface Root {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetails[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  image: string;
  url: string;
}
