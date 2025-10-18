import { useEffect, useState } from "react";
import axios from "axios";
import ModalAluno from "../components/ModalAluno";

export default function Alunos({ token }) {
  const [alunos, setAlunos] = useState([]); // lista de alunos do banco
  const [filtro, setFiltro] = useState(""); // filtro de pesquisa
  const [modal, setModal] = useState(null); // aluno selecionado para modal

  // Função para carregar alunos da API
  const load = async () => {
    const res = await axios.get("http://localhost:4000/alunos", {
      headers: { Authorization: `Bearer ${token}` } // envia token JWT
    });
    setAlunos(res.data); // atualiza lista de alunos
  };

  // Carrega alunos assim que o componente monta
  useEffect(() => { load(); }, []);

  // Deletar aluno
  const deletar = async (id) => {
    await axios.delete(`http://localhost:4000/alunos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    load(); // recarrega lista
  };

  // Filtra alunos pelo nome
  const filtrados = alunos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div>
      <h2 className="text-xl mb-4">Alunos</h2>

      {/* Campo de pesquisa */}
      <input value={filtro} onChange={e => setFiltro(e.target.value)}
             placeholder="Pesquisar..." className="border p-2 mb-2" />

      {/* Botão para criar novo aluno */}
      <button onClick={() => setModal({})} className="ml-2 bg-green-500 px-3 py-1 text-white rounded">Novo</button>

      {/* Tabela de alunos */}
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Telefone</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(aluno => (
            <tr key={aluno.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{aluno.nome}</td>
              <td className="p-2">{aluno.telefone}</td>
              <td className="p-2">
                {/* Editar aluno */}
                <button onClick={() => setModal(aluno)}
                        className="bg-blue-500 px-2 py-1 text-white rounded mr-2">
                  Editar
                </button>

                {/* Deletar aluno */}
                <button onClick={() => deletar(aluno.id)}
                        className="bg-red-500 px-2 py-1 text-white rounded">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de criação/edição */}
      {modal && <ModalAluno token={token} aluno={modal} onClose={() => { setModal(null); load(); }} />}
    </div>
  );
}
