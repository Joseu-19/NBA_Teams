import React from "react";
import PokeCard from "./components/PokeCard";

function App() {
  const pokemonNames = ["pikachu", "bulbasaur", "charizard", "squirtle", "jigglypuff", "meowth"];

  return (
    <div className="App bg-[#252525] min-h-screen p-10">
      {/* Container for PokeCard components */}
      <div className="flex flex-wrap justify-center gap-6">
        {pokemonNames.map((name) => (
          <PokeCard key={name} pokemonName={name} />
        ))}
      </div>
    </div>
  );
}

export default App;
