import { IRootResponse } from "../models/Pokemon.model";

const PokemonCard = ({ pokemon }: IRootResponse) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
};

export default PokemonCard;
