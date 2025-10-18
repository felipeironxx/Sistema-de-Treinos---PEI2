import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [login, setLogin] = useState("");  // input login
  const [senha, setSenha] = useState("");  // input senha
  const [erro, setErro] = useState("");    // mensagem de erro

  const handleLogin = async () => {
    try {
      // Requisição POST para /auth/login
      const res = await axios.post("http://localhost:4000/auth/login", { login, senha });
      localStorage.setItem("token", res.data.token); // salva token
      onLogin(res.data.token);                       // avisa App.jsx
    } catch {
      setErro("Login inválido");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input value={login} onChange={e => setLogin(e.target.value)}
               placeholder="Login" className="border p-2 w-full mb-2" />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)}
               placeholder="Senha" className="border p-2 w-full mb-2" />

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <button onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2">
          Entrar
        </button>
      </div>
    </div>
  );
}
