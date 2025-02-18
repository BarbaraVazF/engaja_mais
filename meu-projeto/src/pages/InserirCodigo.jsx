import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

const InserirCodigo = () => {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de validação do código
    if (codigo === '123456') { // Código fixo para simulação
      navigate('/redefinir-senha');
    } else {
      alert('Código inválido. Tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <Logo />
      <h3>Inserir Código</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="text"
          placeholder="Digite o código de 6 dígitos"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Verificar Código
        </Button>
      </form>
      <p className="link" onClick={() => navigate('/esqueci-senha')}>
        Reenviar código
      </p>
    </div>
  );
};

export default InserirCodigo;