import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import '../style.css';

const MOCKAPI_PETS_URL = 'https://681258653ac96f7119a7be3d.mockapi.io/api/tt/pets';
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';
const PETS_TO_SHOW = 3;

function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetsAndImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const petsResponse = await axios.get(MOCKAPI_PETS_URL);
        const latestPetsData = petsResponse.data.slice(-PETS_TO_SHOW);

        const imagePromises = latestPetsData.map(() => axios.get(DOG_API_URL));
        const imageResponses = await Promise.all(imagePromises);

        const petsWithImages = latestPetsData.map((pet, index) => ({
          ...pet,
          imageUrl: imageResponses[index].data.message,
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
  }, []);

  return (
    <div className='home'>
      <h1>Bem-vindo à Clínica Veterinária PetCare!</h1>
      <p>Conheça alguns de nossos pacientes mais recentes:</p>

      {loading && <p className='loading-error'>Carregando pets...</p>}
      {error && <p className='loading-error'>Erro: {error}</p>}

      {!loading && !error && (
        <div className='pet-list'>
          {pets.length > 0 ? (
            pets.map(pet => (
              <PetCard
                key={pet.id}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                imageUrl={pet.imageUrl}
              />
            ))
          ) : (
            <p>Nenhum pet encontrado.</p>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/login" className='login-button'>
          Entrar como Funcionário
        </Link>
      </div>
    </div>
  );
}

export default Home;
