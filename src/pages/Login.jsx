import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style.css';



const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};
const buttonHoverStyle = {
  backgroundColor: '#218838',
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading, error: authError } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(email, password);

    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className='login-container'>
      <h2>Login de Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className='input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="vet@petcare.com"
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            className='input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="123456"
          />
        </div>
        <button
          type="submit"
          style={{ ...buttonStyle, ...(isHovering ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          disabled={authLoading}
        >
          {authLoading ? 'Entrando...' : 'Entrar'}
        </button>
        {authLoading && <p className='loading'>Verificando...</p>}
        {authError && !authLoading && <p className='error'>{authError}</p>}
      </form>
    </div>
  );
}

export default Login;
