import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard'; // Import PetCard

// --- Configuration ---
const MOCKAPI_PETS_URL = 'https://681258653ac96f7119a7be3d.mockapi.io/api/tt/pets';
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';
const PETS_TO_SHOW = 3;
// --- End Configuration ---

// Basic styling
const homeStyle = { padding: '20px', fontFamily: 'Arial, sans-serif' };
const petListStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' };
const buttonStyle = {
  display: 'inline-block',
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
};
const loadingErrorStyle = { textAlign: 'center', marginTop: '20px', color: 'grey' };

function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetsAndImages = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch all pets
        const petsResponse = await axios.get(MOCKAPI_PETS_URL);
        // Get the latest pets (assuming higher IDs are newer, or just take the last ones)
        const latestPetsData = petsResponse.data.slice(-PETS_TO_SHOW);

        // 2. Fetch random images for each of the latest pets
        const imagePromises = latestPetsData.map(() => axios.get(DOG_API_URL));
        const imageResponses = await Promise.all(imagePromises);

        // 3. Combine pet data with image URLs
        const petsWithImages = latestPetsData.map((pet, index) => ({
          ...pet,
          imageUrl: imageResponses[index].data.message, // Get the image URL from Dog API response
        }));

        setPets(petsWithImages);
      } catch (err) {
        console.error("Error fetching data for Home:", err);
        setError('Não foi possível carregar os dados dos pets. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPetsAndImages();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div style={homeStyle}>
      <h1>Bem-vindo à Clínica Veterinária PetCare!</h1>
      <p>Conheça alguns de nossos pacientes mais recentes:</p>

      {loading && <p style={loadingErrorStyle}>Carregando pets...</p>}
      {error && <p style={loadingErrorStyle}>Erro: {error}</p>}

      {!loading && !error && (
        <div style={petListStyle}>
          {pets.length > 0 ? (
            pets.map(pet => (
              <PetCard
                key={pet.id}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                imageUrl={pet.imageUrl}
              // No owner needed on home page card
              />
            ))
          ) : (
            <p>Nenhum pet encontrado.</p>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/login" style={buttonStyle}>
          Entrar como Funcionário
        </Link>
      </div>
    </div>
  );
}

export default Home;