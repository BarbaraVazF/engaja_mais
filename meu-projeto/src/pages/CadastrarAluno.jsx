import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import VoltarButton from '../components/VoltarButton';
import FileUpload from '../components/FileUpload';
import { addStudent } from '../api/addStudent'; 

const CadastrarAluno = () => {
  const [nome, setNome] = useState('');
  const [relatorio, setRelatorio] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert('Por favor, insira o nome do aluno.');
      return;
    }

    // Recupera o ID do professor logado
    const professorId = localStorage.getItem('professorId');

    // Converte o arquivo PDF para uma URL de dados
    const reader = new FileReader();
    reader.onload = async (e) => {
      const pdfDataUrl = e.target.result;

      // Cria o objeto do novo aluno
      const novoAluno = {
        name: nome,
        relatorios: relatorio ? [{ nome: relatorio.name, data: new Date().toLocaleDateString('pt-BR'), url: pdfDataUrl }] : [],
      };

      try {
        // Envia os dados do aluno para o backend
        const response = await addStudent(novoAluno);
        if (response.error) {
          alert(response.error);
        } else {
          alert('Aluno cadastrado com sucesso!');
          navigate('/home');
        }
      } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        alert("Erro ao cadastrar aluno.");
      }
    };

    if (relatorio) {
      reader.readAsDataURL(relatorio); // Converte o arquivo para data URL
    } else {
      // Se não houver relatório, salva o aluno sem relatório
      const novoAluno = {
        nome: nome,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        relatorios: [],
        professorId: professorId, // Adiciona o ID do professor ao objeto do aluno
      };

      try {
        // Envia os dados do aluno para o backend
        const response = await addStudent(novoAluno);
        if (response.error) {
          alert(response.error);
        } else {
          alert('Aluno cadastrado com sucesso!');
          navigate('/home');
        }
      } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        alert("Erro ao cadastrar aluno.");
      }
    }
  };

  return (
    <div className="cadastrar-aluno-page" style={{backgroundColor: "transparent"}}>
      <Navbar userName="Bárbara" />
      <div className="header">
        <VoltarButton />
        <h1>Cadastrar Novo Aluno</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          type="text"
          placeholder="Nome do Aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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

export default CadastrarAluno;