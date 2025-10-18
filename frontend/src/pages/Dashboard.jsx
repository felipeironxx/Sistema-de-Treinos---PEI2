import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Alunos from "./Alunos";
import Usuarios from "./Usuarios";

export default function Dashboard({ token, onLogout }) {
  const [page, setPage] = useState("inicio"); // controla página atual

  return (
    <div className="flex h-screen">
      {/* Menu lateral */}
      <Sidebar onSelect={setPage} onLogout={onLogout} />

      {/* Conteúdo principal */}
      <div className="flex-1 p-4 overflow-auto">
        {page === "inicio" && <h1 className="text-2xl">Bem-vindo!</h1>}
        {page === "alunos" && <Alunos token={token} />}
        {page === "usuarios" && <Usuarios token={token} />}
        {page === "relatorios" && <h1>📊 Relatórios (em breve)</h1>}
        {page === "whatsapp" && <h1>💬 WhatsApp (em breve)</h1>}
      </div>
    </div>
  );
}
