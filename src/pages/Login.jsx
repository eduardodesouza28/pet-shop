import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginContainerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '30px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};
const inputStyle = {
  width: 'calc(100% - 22px)',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};
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
const errorStyle = {
  color: 'red',
  marginTop: '10px',
  fontSize: '14px',
};
const loadingStyle = {
  color: 'grey',
  marginTop: '10px',
  fontSize: '14px',
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
    <div style={loginContainerStyle}>
      <h2>Login de Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={inputStyle}
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
            style={inputStyle}
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
        {authLoading && <p style={loadingStyle}>Verificando...</p>}
        {authError && !authLoading && <p style={errorStyle}>{authError}</p>}
      </form>
    </div>
  );
}

export default Login;
