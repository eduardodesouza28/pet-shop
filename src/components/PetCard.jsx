import React from 'react';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  textAlign: 'center',
  width: '200px',
  boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
};

const imgStyle = {
  maxWidth: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '4px',
  marginBottom: '10px',
};

const PetCard = ({ name, breed, age, imageUrl, owner }) => {
  return (
    <div style={cardStyle}>
      {imageUrl ? (
        <img src={imageUrl} alt={`A ${breed} dog`} style={imgStyle} />
      ) : (
        <div style={{ ...imgStyle, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Loading...</span>
        </div>
      )}
      <h3>{name}</h3>
      <p>Raça: {breed}</p>
      <p>Idade: {age} anos</p>
      {owner && <p>Tutor: {owner}</p>}
    </div>
  );
};

export default PetCard;
