import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FuncionalidadePopup from '../components/FuncionalidadePopup';
import VoltarButton from '../components/VoltarButton';
import Button from '../components/Button';
import { getStudent } from '../api/getStudent';

const AlunoDetalhes = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [aluno, setAluno] = useState(null);
  const [solicitacoes, setSolicitacoes] = useState([]);

  let params = useParams()
  
  useEffect(() => {

    getStudent(params.id).then((aluno) => {setAluno(aluno)});

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

  const desabilitarBotao = aluno?.relatorios && aluno.relatorios.length > 0;

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

  const handleDownloadRelatorio = (url, nome) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = nome;
    link.click();
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
        <pre>{JSON.stringify(aluno)}</pre>
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
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.length > 0 ? (
            solicitacoes.map((solicitacao) => (
              <tr key={solicitacao.id}>
                <td>{solicitacao.titulo}</td>
                <td>{solicitacao.data}</td>
                <td>
                  <button 
                    onClick={() => removerSolicitacao(solicitacao.id)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
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
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {aluno.relatorios && aluno.relatorios.length > 0 ? (
            aluno.relatorios.map((rel) => (
              <tr key={rel.id}>
                <td>{rel.nome}</td>
                <td>{rel.data}</td>
                <td>
                  <button 
                    onClick={() => removerRelatorio(rel.id)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}
                  >
                    <img src="/apagar_aluno.png" alt="Apagar" width="20" height="20" />
                  </button>
                  <button 
                    onClick={() => handleDownloadRelatorio(rel.url, rel.nome)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    <img src="/download.png" alt="Download" width="20" height="20" />
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

      {(!aluno.relatorios || aluno.relatorios.length === 0) && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            disabled={desabilitarBotao}
            onClick={() => !desabilitarBotao && navigate(`/cadastrar-relatorio/${alunoId}`)}
            style={{
              width: '100%', 
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: desabilitarBotao ? '#5A5858' : '#022651',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: desabilitarBotao ? 'not-allowed' : 'pointer',
              opacity: desabilitarBotao ? 1 : 1,
            }}
          >
            Inserir Novo Relatório
          </button>
        </div>
      )}

      {aluno.relatorios && aluno.relatorios.length > 0 && (
        <div style={{ textAlign: 'center', color: 'gray', fontSize: '16px', marginBottom: '6px' }}>
          Para inserir um novo relatório, é necessário excluir o atual.
        </div>
      )}

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