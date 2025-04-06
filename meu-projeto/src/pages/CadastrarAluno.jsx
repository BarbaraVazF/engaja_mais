import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../api/addStudent";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import { insertReportOnStudent } from "../api/insertReportOnStudent";

const CadastrarAluno = () => {
  const [nome, setNome] = useState("");
  const [relatorio, setRelatorio] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, insira o nome do aluno.");
      return;
    }

    try {
      // Envia os dados do aluno para o backend
      const alunoResponse = await addStudent({ name: nome });
      if (alunoResponse.error) {
        throw new Error(alunoResponse.error);
      }
      
      const alunoId = alunoResponse.id;
      
      if (relatorio) {
        let formData = new FormData();
        formData.append("file", relatorio);
        
        // Envia o relatório para o backend
        const reportResponse = await insertReportOnStudent(alunoId, formData);
        if (reportResponse.error) {
          throw new Error(reportResponse.error);
        }
      }

      alert("Aluno cadastrado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente.");
    }
  };

  return (
    <div
      className="cadastrar-aluno-page"
      style={{ backgroundColor: "transparent" }}
    >
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
        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastrarAluno;
