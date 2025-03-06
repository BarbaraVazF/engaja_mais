// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { authClient } from '../lib/auth-client'; // Importa o authClient

const Home = () => {
  const navigate = useNavigate();

  // Usa o useSession para acessar a sessão do usuário
  const { data: session, isPending, error } = authClient.useSession();

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Verifica se há uma sessão ativa
    if (session?.user) {
      const professorId = session.user.id; // Usa o ID do professor da sessão
      const alunosSalvos = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
      setAlunos(alunosSalvos);
    } else {
      // Se não houver sessão, redireciona para o login
      navigate('/login');
    }
  }, [session, navigate]);

  const removerAluno = (id) => {
    const novaLista = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(novaLista);

    // Atualiza a lista de alunos no localStorage
    const professorId = session.user.id; // Usa o ID do professor da sessão
    localStorage.setItem(`alunos_${professorId}`, JSON.stringify(novaLista));
  };

  // Exibe um loading enquanto a sessão é carregada
  if (isPending) {
    return <div>Carregando...</div>;
  }

  // Exibe uma mensagem de erro se houver algum problema com a sessão
  if (error || !session?.user) {
    return <div>Erro ao carregar a sessão. Por favor, faça login novamente.</div>;
  }

  // Obtém o nome do usuário da sessão
  const userName = session.user.name || 'Usuário';
  const firstName = userName.split(' ')[0];

  return (
    <div className="home-page">
      <Navbar userName={firstName} />
      <h1 className="welcome-message">Seja bem-vinda de volta, {firstName}.</h1>

      <h2>Alunos cadastrados</h2>
      <table className="alunos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de cadastro</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>
                <Link to={`/aluno/${aluno.id}`}>{aluno.nome}</Link>
              </td>
              <td>{aluno.dataCadastro}</td>
              <td>
                <button onClick={() => removerAluno(aluno.id)} className="apagar-button">
                  <img src="/apagar_aluno.png" alt="Apagar" width="20" height="20" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button backgroundColor="#022651" strokeColor="#5A5858" onClick={() => navigate('/cadastrar-aluno')}>
        + Cadastrar novo aluno
      </Button>
    </div>
  );
};

export default Home;