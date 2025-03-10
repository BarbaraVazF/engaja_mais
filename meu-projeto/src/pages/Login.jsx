// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { authClient } from "../lib/auth-client";

const Login = () => {
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authClient.signIn.email({
        email: cpfOrEmail,  // Pode ser CPF ou Email
        password: password
      });
      console.log(response)

      if (!response.error) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name);
        navigate('/home');
      } else {
        alert(response.error.message || "Erro ao fazer login");
      }
    } catch (error) {
      alert("Falha na autenticação. Verifique suas credenciais.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
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
