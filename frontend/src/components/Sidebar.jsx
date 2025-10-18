import { useState } from "react";

export default function Sidebar({ onSelect, onLogout }) {
  const [configOpen, setConfigOpen] = useState(false); // controla menu config aberto

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="text-xl font-bold mb-6">📌 Minha Logo</div>

      {/* Botões do menu principal */}
      <button onClick={() => onSelect("inicio")} className="mb-2 text-left">🏠 Início</button>
      <button onClick={() => onSelect("alunos")} className="mb-2 text-left">👨‍🎓 Alunos</button>
      <button onClick={() => onSelect("relatorios")} className="mb-2 text-left">📊 Relatórios</button>

      {/* Configuração com submenu */}
      <div>
        <button onClick={() => setConfigOpen(!configOpen)} className="mb-2 text-left">⚙️ Configuração</button>
        {configOpen && (
          <div className="ml-4 flex flex-col">
            <button onClick={() => onSelect("usuarios")} className="mb-1 text-left">👤 Usuário do Sistema</button>
            <button onClick={() => onSelect("whatsapp")} className="mb-1 text-left">💬 Whatsapp</button>
          </div>
        )}
      </div>

      {/* Botão logout */}
      <div className="mt-auto">
        <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded w-full">Sair</button>
      </div>
    </div>
  );
}
