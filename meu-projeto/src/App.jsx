import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CadastrarAluno from './pages/CadastrarAluno';
import AlunoDetalhes from './pages/AlunoDetalhes';
import Solicitacao from './pages/Solicitacao';
import CadastrarRelatorio from './pages/CadastrarRelatorio';
import EsqueciSenha from './pages/EsqueciSenha';
import InserirCodigo from './pages/InserirCodigo';
import RedefinirSenha from './pages/RedefinirSenha';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/aluno/:alunoId" element={<AlunoDetalhes />} />
        <Route path="/solicitacao/:funcionalidade" element={<Solicitacao />} />
        <Route path="/cadastrar-relatorio/:alunoId" element={<CadastrarRelatorio />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/inserir-codigo" element={<InserirCodigo />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;