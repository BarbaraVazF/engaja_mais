import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulação: Recupera os dados cadastrados do localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedCpf = localStorage.getItem('userCpf');
  
    if (!storedUserName || !storedCpf) {
      alert("Usuário não encontrado. Verifique seus dados.");
      return;
    }
  
    // Salva o usuário correto na sessão
    localStorage.setItem('userName', storedUserName);
    navigate('/home');
  };

  return (
    <div className="login-page">
      <Logo />
      <h3>Entrar</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="text"
          placeholder="CPF ou Email"
          value={cpfOrEmail}
          onChange={(e) => setCpfOrEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </form>
      <p className="link" onClick={() => navigate('/register')}>
        Não tem uma conta? Cadastre-se
      </p>
      <p className="link" onClick={() => navigate('/esqueci-senha')}>
        Esqueci minha senha
      </p>
    </div>
  );
};

export default Login;
