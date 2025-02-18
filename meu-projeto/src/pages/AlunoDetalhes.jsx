import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FuncionalidadePopup from '../components/FuncionalidadePopup';
import VoltarButton from '../components/VoltarButton';
import Button from '../components/Button';

const AlunoDetalhes = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [aluno, setAluno] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Recupera a lista de alunos do professor
    const alunosSalvos = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
    const alunoEncontrado = alunosSalvos.find((al) => String(al.id) === String(alunoId));
    setAluno(alunoEncontrado);

    // Recupera as solicitações do aluno
    if (alunoEncontrado && alunoEncontrado.solicitacoes) {
      setSolicitacoes(alunoEncontrado.solicitacoes);
    }
  }, [alunoId]);

  const removerRelatorio = (id) => {
    const novosRelatorios = aluno.relatorios.filter((rel) => rel.id !== id);

    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Atualiza a lista de alunos no localStorage
    const alunosAtualizados = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
    const alunoIndex = alunosAtualizados.findIndex((al) => String(al.id) === String(alunoId));
    alunosAtualizados[alunoIndex].relatorios = novosRelatorios;

    localStorage.setItem(`alunos_${professorId}`, JSON.stringify(alunosAtualizados));
    setAluno({ ...aluno, relatorios: novosRelatorios });
  };

  const removerSolicitacao = (id) => {
    const novasSolicitacoes = solicitacoes.filter((solicitacao) => solicitacao.id !== id);

    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Atualiza a lista de alunos no localStorage
    const alunosAtualizados = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
    const alunoIndex = alunosAtualizados.findIndex((al) => String(al.id) === String(alunoId));
    alunosAtualizados[alunoIndex].solicitacoes = novasSolicitacoes;

    localStorage.setItem(`alunos_${professorId}`, JSON.stringify(alunosAtualizados));
    setSolicitacoes(novasSolicitacoes);
  };

  const handleFuncionalidadeClick = (title) => {
    setPopupTitle(title);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleGerarSolicitacao = (title) => {
    const novaSolicitacao = {
      id: Date.now(),
      titulo: title,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    // Atualiza o estado de solicitações
    const novasSolicitacoes = [...solicitacoes, novaSolicitacao];
    setSolicitacoes(novasSolicitacoes);

    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Atualiza a lista de alunos no localStorage
    const alunosAtualizados = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];
    const alunoIndex = alunosAtualizados.findIndex((al) => String(al.id) === String(alunoId));
    alunosAtualizados[alunoIndex].solicitacoes = novasSolicitacoes;

    localStorage.setItem(`alunos_${professorId}`, JSON.stringify(alunosAtualizados));

    // Redireciona para a tela de solicitação
    navigate(`/solicitacao/${encodeURIComponent(title)}`);
  };

  const funcionalidades = [
    { title: 'Plano de ensino personalizado', color: '#FFDB00' },
    { title: 'Materiais de estudo e atividades para casa', color: '#FE3B3E' },
    { title: 'Modelo de avaliação individualizado', color: '#45A3FE' },
    { title: 'Estratégia de gamificação', color: '#0251B1' },
  ];

  if (!aluno) {
    return <div>Aluno não encontrado.</div>;
  }

  return (
    <div className="aluno-detalhes-page">
      <Navbar userName="Bárbara" />
      <div className="header" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '100px' }}>
        <VoltarButton />
        <h1>{aluno.nome}</h1>
      </div>
      
      <h2 style={{ fontSize: '18px' }}>Funcionalidades</h2>
      <div className="funcionalidades">
        {funcionalidades.map((func, index) => {
          const corComOpacidade = func.color + '33';
          return (
            <button
              key={index}
              style={{
                backgroundColor: corComOpacidade,
                border: `2px solid ${func.color}`,
                color: 'black',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 15px',
                borderRadius: '8px',
                margin: '5px',
                cursor: 'pointer',
              }}
              onClick={() => handleFuncionalidadeClick(func.title)}
            >
              {func.title}
            </button>
          );
        })}
      </div>

      <h2 style={{ fontSize: '18px', marginTop: '40px' }}>Histórico de Solicitações</h2>
      <table className="relatorios-table">
        <thead>
          <tr>
            <th>Título da Solicitação</th>
            <th>Data da Solicitação</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.length > 0 ? (
            solicitacoes.map((solicitacao) => (
              <tr key={solicitacao.id}>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/solicitacao/${encodeURIComponent(solicitacao.titulo)}`);
                    }}
                  >
                    {solicitacao.titulo}
                  </a>
                </td>
                <td>{solicitacao.data}</td>
                <td>
                  <button onClick={() => removerSolicitacao(solicitacao.id)}>
                    <img src="/apagar_aluno.png" alt="Apagar" width="20" height="20" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhuma solicitação cadastrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 style={{ fontSize: '18px' }}>Relatórios</h2>
      <table className="relatorios-table">
        <thead>
          <tr>
            <th>Nome do Relatório</th>
            <th>Data de Inserção</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {aluno.relatorios && aluno.relatorios.length > 0 ? (
            aluno.relatorios.map((rel) => (
              <tr key={rel.id}>
                <td>
                  <a href={rel.url} download={`${rel.nome}.pdf`}>
                    {rel.nome}
                  </a>
                </td>
                <td>{rel.data}</td>
                <td>
                  <button onClick={() => removerRelatorio(rel.id)}>
                    <img src="/apagar_aluno.png" alt="Apagar" width="20" height="20" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum relatório cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={() => navigate(`/cadastrar-relatorio/${alunoId}`)}
        >
          Inserir Novo Relatório
        </Button>
      </div>

      {popupOpen && (
        <FuncionalidadePopup
          title={popupTitle}
          onClose={handleClosePopup}
          onGerar={() => {
            handleGerarSolicitacao(popupTitle);
            handleClosePopup();
          }}
        />
      )}
    </div>
  );
};

export default AlunoDetalhes;