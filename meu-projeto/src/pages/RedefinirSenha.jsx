import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novaSenha === confirmarSenha) {
      alert('Senha redefinida com sucesso!');
      navigate('/login');
    } else {
      alert('As senhas não coincidem. Tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <Logo />
      <h3>Redefinir Senha</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Redefinir Senha
        </Button>
      </form>
      <p className="link" onClick={() => navigate('/login')}>
        Voltar para o login
      </p>
    </div>
  );
};

export default RedefinirSenha;