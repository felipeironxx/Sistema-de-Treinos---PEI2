import { useState } from "react";
import axios from "axios";

export default function ModalUsuario({ token, usuario, onClose }) {
  const [form, setForm] = useState(usuario);

  const salvar = async () => {
    if (form.id) {
      // Atualiza usuário
      await axios.put(`http://localhost:4000/usuarios/${form.id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      // Cria novo usuário
      await axios.post(`http://localhost:4000/usuarios`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    onClose();
  };

  const deletar = async () => {
    if (form.id) {
      await axios.delete(`http://localhost:4000/usuarios/${form.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">{form.id ? "Editar Usuário" : "Novo Usuário"}</h2>

        {/* Campos do formulário */}
        <input value={form.nome || ""} onChange={e => setForm({ ...form, nome: e.target.value })}
               placeholder="Nome" className="border p-2 w-full mb-2" />
        <input value={form.login || ""} onChange={e => setForm({ ...form, login: e.target.value })}
               placeholder="Login" className="border p-2 w-full mb-2" />
        <input type="password" value={form.senha || ""} onChange={e => setForm({ ...form, senha: e.target.value })}
               placeholder="Senha" className="border p-2 w-full mb-2" />
        <input value={form.telefone || ""} onChange={e => setForm({ ...form, telefone: e.target.value })}
               placeholder="Telefone" className="border p-2 w-full mb-2" />

        <div className="flex justify-between">
          {form.id && <button onClick={deletar} className="bg-red-500 text-white px-4 py-2 rounded">Excluir</button>}

          <div className="ml-auto">
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Cancelar</button>
            <button onClick={salvar} className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
