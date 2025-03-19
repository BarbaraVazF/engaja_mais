import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { insertReportOnStudent } from "../api/insertReportOnStudent";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";

const CadastrarRelatorio = () => {
  const { alunoId } = useParams();
  const navigate = useNavigate();
  const [relatorio, setRelatorio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!relatorio) {
      alert("Por favor, insira um relatório.");
      return;
    }

    let formData = new FormData();
    formData.append("file", relatorio);

    try {
      const response = await insertReportOnStudent(alunoId, formData);
      if (response.error) {
        throw new Error(response.error);
      }
      alert("Relatório cadastrado com sucesso!");
      navigate(`/aluno/${alunoId}`);
    } catch (error) {
      console.error("Erro ao cadastrar relatório:", error);
      alert("Erro ao cadastrar relatório. Tente novamente.");
      return;
    }
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
        <Button backgroundColor="#022651" strokeColor="#5A5858" type="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastrarRelatorio;
