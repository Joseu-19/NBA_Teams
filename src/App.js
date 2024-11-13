import './App.css';
import navItems from './components/NavData.js';
import NavBar from './components/Nav.js';
import Header from './components/Header.js';
import PokeDeck from './components/PokeDeck.js';
import Footer from './components/Footer.js';

const App = () => {

  return (
    <div className="App">
      <NavBar logoSrc="./images/logo.jpg" navItems={navItems} />
      <Header
        backgroundPic="pokemonSplash.jpg"
        title="PokeVault"
        subHead="A Treasure Trove of Pokémon Information."
      />

      <PokeDeck/>

      <Footer
        footTxt="Copyright © 2024 - All right reserved"
      />
    </div>
  );
};

export default App;
