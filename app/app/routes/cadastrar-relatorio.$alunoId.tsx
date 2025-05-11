import { useState } from "react";
import { Form, redirect, useFetcher } from "react-router";
import { insertReportOnStudent } from "../api/insertReportOnStudent.server";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import VoltarButton from "../components/VoltarButton";
import type { Route } from "./+types/cadastrar-relatorio.$alunoId";

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);
  console.log("file", typeof formData.get("file"));
  await insertReportOnStudent(request, formData, params.alunoId);

  return redirect(`/aluno/${params.alunoId}`);
}

export default function CadastrarRelatorio({ params }: Route.ComponentProps) {
  const [relatorio, setRelatorio] = useState(null);

  const fetcher = useFetcher();

  return (
    <div
      className="cadastrar-relatorio-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="header" style={{ marginTop: "50px" }}>
        <VoltarButton />
        <h1>Cadastrar Relatório</h1>
      </div>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          gap: "20px",
        }}
        method="post"
        className="form-container"
        encType="multipart/form-data"
      >
        <div className="file-upload-container">
          <div className="file-upload">
            <label htmlFor="relatorio">Anexar Relatório (PDF)</label>
            <input type="file" id="file" accept=".pdf" name="file" />
            <p>
              Inserir um relatório com as seguintes informações do aluno: idade,
              série escolar, nível de suporte, pontos fortes e principais
              desafios (acadêmicos, sociais e/ou sensoriais), interesses,
              objetivos de aprendizagem e desenvolvimento, padrão de
              aprendizagem e, se pertinente, outras informações relevantes sobre
              seu contexto.
            </p>
          </div>
        </div>
        <Button backgroundColor="#022651" strokeColor="#5A5858" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
