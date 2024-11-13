import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon/";

const cardColors = [
  { type: "grass", background: "#78C850", border: "green", footer: "lightgreen" },
  { type: "fire", background: "#F08030", border: "#a83236", footer: "#a85632" },
  { type: "water", background: "#48e0f9", border: "blue", footer: "lightblue" },
  { type: "ground", background: "#873e23", border: "brown", footer: "#eab676" },
  { type: "electric", background: "#00f0ff", border: "#396cff", footer: "white" },
  { type: "normal", background: "white", border: "grey", footer: "grey" },
];

const getColorByType = (type) => {
  const color = cardColors.find((color) => color.type === type);
  return color || { background: "#A8A878", border: "gray", footer: "lightgray" }; 
};

const PokeCard = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const promises = [];
        
        for (let i = 1; i <= 100; i++) {
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
        const type = types[0].type.name;
        const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;

        const { background, border, footer } = getColorByType(type);

        return (
          <div key={pokemon.id} className="poke-card" style={{ backgroundColor: background, borderColor: border}}>
         {/* display gif based on type */}

          {type === "electric" && <div className="overlay electric-overlay"></div>}
          {type === "fire" && <div className="overlay fire-overlay"></div>}
          {type === "water" && <div className="overlay water-overlay"></div>}

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
            <div className="poke-card-footer" style={{ backgroundColor: footer }}>
              <span>{name} is a {type} type Pokémon.</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PokeCard;
