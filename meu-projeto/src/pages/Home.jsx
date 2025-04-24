// src/components/Home.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listStudent } from "../api/listStudent";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { authClient } from "../lib/auth-client"; // Importa o authClient

const Home = () => {
  const navigate = useNavigate();

  // Usa o useSession para acessar a sessão do usuário
  const { data: session, isPending, error } = authClient.useSession();

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Verifica se há uma sessão ativa
    if (session?.user) {
      listStudent().then((value) => {
        setAlunos(value);
      });
    } else {
      // Se não houver sessão, redireciona para o login
      navigate("/login");
    }
  }, [session, navigate]);

  const removerAluno = (id) => {
    const novaLista = alunos.filter((aluno) => aluno.id !== id);
    setAlunos(novaLista);
  };

  // Exibe um loading enquanto a sessão é carregada
  if (isPending) {
    return <div>Carregando...</div>;
  }

  // Exibe uma mensagem de erro se houver algum problema com a sessão
  if (error || !session?.user) {
    return (
      <div>Erro ao carregar a sessão. Por favor, faça login novamente.</div>
    );
  }

  // Obtém o nome do usuário da sessão
  const userName = session.user.name || "Usuário";
  const firstName = userName.split(" ")[0];

  return (
    <div className="home-page">
      <Navbar userName={firstName} />
      <h1 className="welcome-message" style={{ marginTop: "100px" }}>
        Olá de volta, {firstName}.
      </h1>

      <h2>Alunos cadastrados</h2>
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
                  onClick={() => removerAluno(aluno.id)}
                  className="apagar-button"
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
  );
};

export default Home;
