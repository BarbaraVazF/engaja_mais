import { useState, type FormEvent } from "react";
import { redirect } from "react-router";
import { insertReportOnStudent } from "../api/insertReportOnStudent.server";
import Button from "../components/Button";
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import type { Route } from "./+types/cadastrar-relatorio.$alunoId";

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  await insertReportOnStudent(request, formData, params.alunoId);

  return redirect(`/aluno/${params.alunoId}`);
}

export default function CadastrarRelatorio({ params }: Route.ComponentProps) {
  const [relatorio, setRelatorio] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!relatorio) {
      alert("Por favor, insira um relatório.");
      return;
    }

    const formData = new FormData();
    formData.append("file", relatorio);

    try {
      await fetch(`/cadastrar-relatorio/${params.alunoId}`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Erro ao cadastrar relatório:", error);
    }
  };

  return (
    <div className="cadastrar-relatorio-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }} >
      <Navbar />
      <div className="header" style={{ marginTop: '50px' }}>
        <VoltarButton />
        <h1>Cadastrar Relatório</h1>
      </div>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '30px', gap: '20px' }} onSubmit={handleSubmit} className="form-container">
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
