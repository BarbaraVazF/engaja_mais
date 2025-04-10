import { useState, type FormEvent } from "react";
import { redirect } from "react-router";
import { addStudent } from "../api/addStudent.server";
import { insertReportOnStudent } from "../api/insertReportOnStudent.server";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import type { Route } from "./+types/cadastrar-aluno";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const student = await addStudent(request, formData);
  await insertReportOnStudent(request, student.id, formData);

  return redirect(`/aluno/${student.id}`);
}

export default function CadastrarAluno() {
  const [nome, setNome] = useState("");
  const [relatorio, setRelatorio] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Por favor, insira o nome do aluno.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      if (relatorio) {
        formData.append("file", relatorio);
      }

      const response = await fetch("/cadastrar-aluno", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao cadastrar aluno");
      }
    } catch (error) {}
  };

  return (
    <div
      className="cadastrar-aluno-page"
      style={{ backgroundColor: "transparent" }}
    >
      <Navbar />
      <div className="header">
        <VoltarButton />
        <h1>Cadastrar Novo Aluno</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="form-container"
        encType="multipart/form-data"
      >
        <InputField
          type="text"
          placeholder="Nome do Aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <div className="file-upload-container">
          <FileUpload onChange={(e: any) => setRelatorio(e.target.files[0])} />
        </div>
        <Button backgroundColor="#022651" strokeColor="#5A5858" type="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
