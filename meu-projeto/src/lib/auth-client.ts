import { createAuthClient } from "better-auth/react";

// Cria o cliente de autenticação
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // URL do servidor de autenticação
  fetchOptions: {
    mode: "cors",
  },
});
