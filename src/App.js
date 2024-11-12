import './App.css';
import navItems from './components/NavData.js';
import NavBar from './components/Nav.js';
import Header from './components/Header.js';

function App() {
  return (
    <div className="App">
      <NavBar
        logoSrc="./images/logo.jpg"
        navItems={navItems}
       />
      <Header
        backgroundPic="pokemonSplash.jpg"
        title="PokeVault"
        subHead="A Treasure Trove of Pokémon Information."
      />
    </div>
  );
}

export default App;
