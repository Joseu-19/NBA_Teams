import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import CardContainer from './components/CardContainer';
import CardModal from './components/CardModal';

const App = () => {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
        useEffect(() => {
            const fetchPokemon = async () => {
                const promises = [];
                for (let i = 1; i <= 15; i++) {
                    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                    
                    // Pushing each request into the promises array, handling errors with .catch
                    promises.push(
                        axios.get(url)
                            .then((res) => res.data)
                            .catch((err) => {
                                console.error(`Error fetching data for Pokémon ID ${i}:`, err);
                                return null; // Handle individual errors by returning null
                            })
                    );
                }
    
                try {
                    const results = await Promise.all(promises);
                    const pokemonData = results
                        .filter((result) => result !== null) // Filter out any failed fetches
                        .map((result) => ({
                            name: result.name,
                            image: result.sprites['front_default'],
                            type: result.types.map((type) => type.type.name).join(', '),
                            id: result.id,
                        }));
                    
                    setPokemon(pokemonData);
                } catch (error) {
                    setError('Failed to fetch Pokémon data');
                    console.error('Error fetching Pokémon data:', error);
                }
            };
    
            fetchPokemon();
        }, []);
/*
    const handleCardClick = (card) => {
      setSelectedCard(card);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    }; */

    // Displaying the Pokémon details in card format using Tailwind CSS for styling
    return (
        <div className="flex flex-wrap justify-center p-4">
 
            <ul className="flex flex-wrap gap-4">
                {pokemon.map((pokeman) => (
                    <li
                        key={pokeman.id}
                        className="card bg-white shadow-lg rounded-lg p-4 w-48 text-center hover:shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        <img
                            className="card-image w-24 h-24 mx-auto mb-4"
                            src={pokeman.image}
                            alt={pokeman.name}
                        />
                        <h2 className="card-title text-xl font-semibold capitalize mb-2">
                            {pokeman.name}
                        </h2>
                        <p className="card-subtitle text-gray-500">Type: {pokeman.type}</p>
                    </li>
                ))}
            </ul>
  
        </div>
    );
};

export default App;
