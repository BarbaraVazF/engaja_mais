// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import { authClient } from "../lib/auth-client";
import { createAuthClient } from "better-auth/client"

const Login = () => {
  const [cpfOrEmail, setCpfOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authClient =  createAuthClient()
  
  const signIn = async () => {
      const data = await authClient.signIn.social({
          provider: "google"
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authClient.signIn.email({
        email: cpfOrEmail,
        password: password,
      });
      console.log(response);

      if (!response.error) {
        navigate("/home");
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
      <div className="logo-container" style={{ display: "flex",  flexDirection: "column",  justifyContent: "center",  alignItems: "center",  width: "100%"  }}>
        <Logo />
        <h3>Entrar</h3>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="text"
          placeholder="Email"
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
      <p className="link" onClick={() => navigate("/register")}>
        Não tem uma conta? Cadastre-se
      </p>
      <p className="link" onClick={() => navigate("/esqueci-senha")}>
        Esqueci minha senha
      </p>
      <button className="google-login-button" onClick={signIn}>Entrar com Google</button>
    </div>
  );
};

export default Login;
