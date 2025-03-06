import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { authClient } from "../lib/auth-client";

const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
  
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        cpf,
      });
  
      if (error) {
        alert("Erro ao cadastrar: " + error.message);
        return; // Adicionado para evitar que navegue em caso de erro
      }
  
      alert("Cadastro realizado com sucesso!");
      navigate("/home"); 
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="register-page">
      <Logo />
      <h3>Cadastre-se</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirmação da senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </form>
      <p className="link" onClick={() => navigate('/login')}>
        Já tem uma conta? Entrar
      </p>
    </div>
  );
};

export default Register;