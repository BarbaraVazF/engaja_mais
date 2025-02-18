import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Usuário';
  const firstName = userName.split(' ')[0];

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Recupera a lista de alunos do professor
    const alunosSalvos = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
    setAlunos(alunosSalvos);
  }, []);

  const removerAluno = (id) => {
    const novaLista = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(novaLista);

    // Atualiza a lista de alunos no localStorage
    const professorId = localStorage.getItem('professorId');
    localStorage.setItem(`alunos_${professorId}`, JSON.stringify(novaLista));
  };

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