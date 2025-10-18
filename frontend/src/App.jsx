import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // Guarda o token JWT do usuário
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Se não houver token, mostra tela de login
  if (!token) {
    return <Login onLogin={setToken} />;
  }

  // Se tiver token, mostra dashboard
  return (
    <Dashboard
      token={token}  // passa token para chamadas API
      onLogout={() => {  // logout: remove token e volta para login
        localStorage.removeItem("token");
        setToken(null);
      }}
    />
  );
}
