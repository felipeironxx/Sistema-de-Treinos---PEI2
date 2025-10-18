import { useEffect, useState } from "react";
import axios from "axios";
import ModalUsuario from "../components/ModalUsuario";

export default function Usuarios({ token }) {
  const [usuarios, setUsuarios] = useState([]); // lista de usuários
  const [filtro, setFiltro] = useState("");     // filtro de pesquisa
  const [modal, setModal] = useState(null);     // usuário selecionado

  const load = async () => {
    const res = await axios.get("http://localhost:4000/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsuarios(res.data);
  };

  useEffect(() => { load(); }, []);

  const deletar = async (id) => {
    await axios.delete(`http://localhost:4000/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    load();
  };

  const filtrados = usuarios.filter(u => u.nome.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div>
      <h2 className="text-xl mb-4">Usuários</h2>

      {/* Campo de pesquisa */}
      <input value={filtro} onChange={e => setFiltro(e.target.value)}
             placeholder="Pesquisar..." className="border p-2 mb-2" />

      {/* Botão novo usuário */}
      <button onClick={() => setModal({})} className="ml-2 bg-green-500 px-3 py-1 text-white rounded">Novo</button>

      {/* Tabela de usuários */}
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Login</th>
            <th className="p-2">Telefone</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(usuario => (
            <tr key={usuario.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{usuario.nome}</td>
              <td className="p-2">{usuario.login}</td>
              <td className="p-2">{usuario.telefone}</td>
              <td className="p-2">
                <button onClick={() => setModal(usuario)}
                        className="bg-blue-500 px-2 py-1 text-white rounded mr-2">Editar</button>
                <button onClick={() => deletar(usuario.id)}
                        className="bg-red-500 px-2 py-1 text-white rounded">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de criação/edição */}
      {modal && <ModalUsuario token={token} usuario={modal} onClose={() => { setModal(null); load(); }} />}
    </div>
  );
}
