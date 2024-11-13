import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeModal from "./PokeModal";

const API = "https://pokeapi.co/api/v2/pokemon/";

const PokeCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [price, setPrice] = useState(null);


  const prices = [10, 15, 8, 8, 12, 6, 8, 6, 8, 14, 15, 8, 13, 5, 10, 14, 7, 12, 5, 12];


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const promises = [];

        for (let i = 1; i <= 20; i++) {
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

  const openModal = (pokemon, index) => {
    setSelectedPokemon(pokemon);
    setPrice(prices[index]);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setPrice(null);
  };

  if (isLoading) return <div>Loading Pokémon...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="poke-card-container">
      {pokemons.map((pokemon, index) => {
        const { name, sprites, types, stats } = pokemon;
        const imageUrl = sprites.other["official-artwork"].front_default;
        const type = types.map((typeInfo) => typeInfo.type.name).join(", ");
        const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;

        return (
          <div
            key={pokemon.id}
            className="poke-card"
            onClick={() => openModal(pokemon, index)}
          >
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
      {selectedPokemon && (
        <PokeModal
          isOpen={!!selectedPokemon}
          onClose={closeModal}
          price={price}
          pokemonName={selectedPokemon.name}
        />
      )}
    </div>
  );
};

export default PokeCard;
