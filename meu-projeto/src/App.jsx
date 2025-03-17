import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import AlunoDetalhes from "./pages/AlunoDetalhes";
import CadastrarAluno from "./pages/CadastrarAluno";
import CadastrarRelatorio from "./pages/CadastrarRelatorio";
import EsqueciSenha from "./pages/EsqueciSenha";
import Home from "./pages/Home";
import InserirCodigo from "./pages/InserirCodigo";
import Login from "./pages/Login";
import RedefinirSenha from "./pages/RedefinirSenha";
import Register from "./pages/Register";
import Solicitacao from "./pages/Solicitacao";

const protectedRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/cadastrar-aluno",
    component: CadastrarAluno,
  },
  {
    path: "/aluno/:alunoId",
    component: AlunoDetalhes,
  },
  {
    path: "/solicitacao/:funcionalidade",
    component: Solicitacao,
  },
  {
    path: "/cadastrar-relatorio/:alunoId",
    component: CadastrarRelatorio,
  },
];

const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/esqueci-senha",
    component: EsqueciSenha,
  },
  {
    path: "/inserir-codigo",
    component: InserirCodigo,
  },
  {
    path: "/redefinir-senha",
    component: RedefinirSenha,
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"}></Navigate>}></Route>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute>
                <route.component />
              </PublicRoute>
            }
          />
        ))}
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <route.component />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
