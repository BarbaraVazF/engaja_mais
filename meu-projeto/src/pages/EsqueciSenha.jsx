import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio de e-mail
    alert(`Um código foi enviado para ${email}. Verifique sua caixa de entrada.`);
    navigate('/inserir-codigo');
  };

  return (
    <div className="login-page">
      <Logo />
      <h3>Esqueci minha senha</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="email"
          placeholder="Digite seu e-mail cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Enviar Código
        </Button>
      </form>
      <p className="link" onClick={() => navigate('/login')}>
        Voltar para o login
      </p>
    </div>
  );
};

export default EsqueciSenha;