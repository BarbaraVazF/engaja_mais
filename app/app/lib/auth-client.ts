import { createAuthClient } from "better-auth/react";

// Cria o cliente de autenticação
export const authClient = createAuthClient({
  fetchOptions: {
    mode: "cors",
  },
});
