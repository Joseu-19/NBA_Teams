import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon/";

const PokeCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const promises = [];
        
        for (let i = 1; i <= 51; i++) {
          promises.push(axios.get(`${API}${i}`));
        }

        const responses = await Promise.all(promises);

        const pokemonData = responses.map((response) => response.data);
        setPokemons(pokemonData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (isLoading) {
    return <div>Loading Pokémon...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="poke-card-container">
      {pokemons.map((pokemon) => {
        const { name, sprites, types, stats } = pokemon;
        const imageUrl = sprites.other["official-artwork"].front_default;
        const type = types.map((typeInfo) => typeInfo.type.name).join(", ");
        const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;

        return (
          <div key={pokemon.id} className="poke-card">
            <div className="poke-card-header">
              <span className="poke-type">Type: {type}</span>
            </div>
            <div className="poke-card-title">
              <h2>{name}</h2>
              <div className="poke-hp">{hp} HP</div>
            </div>
            <div className="poke-card-image">
              <img src={imageUrl} alt={name} />
            </div>
            <div className="poke-card-footer">
              <span>{name} is a {type} type Pokémon.</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokeCard;
