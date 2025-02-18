import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import VoltarButton from '../components/VoltarButton';

const CadastrarRelatorio = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [relatorio, setRelatorio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!relatorio) {
      alert('Por favor, insira um relatório.');
      return;
    }

    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Recupera a lista de alunos do professor
    const alunosSalvos = JSON.parse(localStorage.getItem(`alunos_${professorId}`)) || [];

    // Encontra o aluno pelo ID
    const alunoIndex = alunosSalvos.findIndex((al) => String(al.id) === String(alunoId));
    if (alunoIndex === -1) {
      alert('Aluno não encontrado.');
      return;
    }

    // Converte o arquivo PDF para uma URL de dados
    const reader = new FileReader();
    reader.onload = (e) => {
      const pdfDataUrl = e.target.result;

      // Cria o objeto do novo relatório
      const novoRelatorio = {
        id: Date.now(),
        nome: relatorio.name,
        data: new Date().toLocaleDateString('pt-BR'),
        url: pdfDataUrl,
      };

      // Adiciona o novo relatório ao aluno
      alunosSalvos[alunoIndex].relatorios = [
        ...(alunosSalvos[alunoIndex].relatorios || []),
        novoRelatorio,
      ];

      // Atualiza o localStorage
      localStorage.setItem(`alunos_${professorId}`, JSON.stringify(alunosSalvos));

      alert('Relatório cadastrado com sucesso!');
      navigate(`/aluno/${alunoId}`);
    };

    reader.readAsDataURL(relatorio); // Converte o arquivo para data URL
  };

  return (
    <div className="cadastrar-relatorio-page">
      <Navbar userName="Bárbara" />
      <div className="header">
        <VoltarButton />
        <h1>Cadastrar Novo Relatório</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="file-upload-container">
          <FileUpload onChange={(e) => setRelatorio(e.target.files[0])} />
        </div>
        <Button backgroundColor="#022651" strokeColor="#5A5858" onClick={handleSubmit}>
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastrarRelatorio;