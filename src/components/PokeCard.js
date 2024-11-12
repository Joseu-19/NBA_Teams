import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon/";

const PokeCard = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API}${pokemonName}`);
        setPokemonData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonData) {
    return null;
  }

  const { name, sprites, types, stats } = pokemonData;

  const imageUrl = sprites.other["official-artwork"].front_default;
  const type = types.map((typeInfo) => typeInfo.type.name).join(", ");
  const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;

  return (
    <div className=" h-screen bg-[#252525] ">
      <div className="max-w-[400px] mx-auto bg-[#f3e67c] p-4 rounded-[12px] shadow-lg border-[21px] border-[#f4d700]">
        <div className="flex justify-between  mt-[-10px]">
          <span className="text-xs font-bold text-black ml-[7px] mb-[-6px]">Type: {type}</span>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-[3px] ml-[7px]">{name}</h2>
          <div className="flex items-center">
            <span className="text-xl text-red-700 mb-[3px]">{hp} HP</span>
          </div>
        </div>

        <div className="ml-2 mr-2 mt-[-5px] mb-2 border-[6px] border-[#ba8e0f]">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="flex justify-center">
          <div className="text-xs mb-1 bg-[#bc8c0c] border border-[#bc8c0c] p-2 flex justify-center items-center h-[10px] w-[280px] italic font-semibold">
            <span>{name} is a {type} type Pokémon.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
