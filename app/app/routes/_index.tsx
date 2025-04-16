// src/components/Home.jsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Button from "~/components/Button";
import { auth } from "~/lib/auth.server";
import { listStudent } from "../api/listStudent.server";
import Navbar from "../components/Navbar";
import type { Route } from "./+types/_index";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession(request);
  const students = await listStudent(request);
  return { students, session };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { students: alunos, session } = loaderData;

  const navigate = useNavigate();

  useEffect(() => {
    if (!session?.user) {
      navigate("/login");
    }
  }, [session, navigate]);

  const userName = session!.user.name || "Usuário";
  const firstName = userName.split(" ")[0];

  async function handleDeleteStudent(studentId: string) {
    await fetch(`/aluno/${studentId}`, {
      method: "DELETE",
    });
  }

  return (
    <div>
      <Navbar userName={firstName} />
      <div className="home-page">
        <h1
          className="welcome-message"
          style={{ marginTop: "30px", fontSize: "24px" }}
        >
          Olá, {firstName}.
        </h1>

        <h3 style={{ fontSize: "22px" }}>Alunos cadastrados</h3>
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
                  <Link to={`/aluno/${aluno.id}`}>{aluno.name}</Link>
                </td>
                <td>{new Date(aluno.createdAt).toLocaleDateString("pt-BR")}</td>
                <td>
                  <button
                    className="apagar-button"
                    onClick={() => handleDeleteStudent(aluno.id)}
                  >
                    <img
                      src="/apagar_aluno.png"
                      alt="Apagar"
                      width="20"
                      height="20"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button
          backgroundColor="#022651"
          strokeColor="#5A5858"
          onClick={() => navigate("/cadastrar-aluno")}
        >
          + Cadastrar novo aluno
        </Button>
      </div>
    </div>
  );
}
