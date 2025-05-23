import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PetCard from '../components/PetCard';
import '../style.css';

const MOCKAPI_PETS_URL = 'https://681258653ac96f7119a7be3d.mockapi.io/api/tt/pets';
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPetsAndImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const petsResponse = await axios.get(MOCKAPI_PETS_URL);
        const allPetsData = petsResponse.data;

        const imagePromises = allPetsData.map(() => axios.get(DOG_API_URL));
        const imageResponses = await Promise.all(imagePromises);

        const petsWithImages = allPetsData.map((pet, index) => ({
          ...pet,
          imageUrl: imageResponses[index]?.data?.message || null,
        }));

        setPets(petsWithImages);
      } catch (err) {
        setError('Não foi possível carregar a lista completa de pets.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPetsAndImages();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>Dashboard PetCare</h1>
        {user && <span>Olá, {user.name}!</span>}
        <button onClick={handleLogout} className='logout-button'>
          Sair
        </button>
      </div>

      <h2>Lista de Pacientes</h2>

      {loading && <p className='loading-error'>Carregando lista de pets...</p>}
      {error && <p className='loading-error'>Erro: {error}</p>}

      {!loading && !error && (
        <div className='pet-list'>
          {pets.length > 0 ? (
            pets.map(pet => (
              <PetCard
                key={pet.id}
                name={pet.nome}
                breed={pet.raca}
                age={pet.idade}
                owner={pet.owner}
                imageUrl={pet.imageUrl}
              />
            ))
          ) : (
            <p>Nenhum pet cadastrado encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
