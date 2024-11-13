import React from "react";
import PokeCard from "./PokeCard";

const PokeDeck = () => {
  return (
    <div className="pokeDeck">
      <div className="pokeCardContainer">
        <PokeCard />
      </div>
    </div>
  );
};

export default PokeDeck;
