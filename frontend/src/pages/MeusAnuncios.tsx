import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";




interface Anuncio {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  imagemUrl: string;
}
 
const API_URL = import.meta.env.VITE_API_URL;
 
export function MeusAnuncios() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  const { token } = useAuth();
 
  useEffect(() => {
    setErro(false);
    fetch(`${API_URL}/anuncios/meus`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    .then((res) => {
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return res.json();
    })


    .then((data) => setAnuncios(data))
    .catch(() => setErro(true))
    .finally(() => setCarregando(false));
    }, [token]);
 
  async function handleDelete(id: string) {
    setExcluindoId(id);
    try {
      const res = await fetch(`${API_URL}/anuncios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setAnuncios((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert("Não foi possível excluir o anúncio. Tente novamente.");
    } finally {
      setExcluindoId(null);
    }
  }
 
  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <span className="font-mono text-xs uppercase tracking-widest text-[#4C1D95]">
        Sua vitrine
      </span>
      <h1 className="text-2xl font-bold text-[#1C0F33] mt-1 mb-8">Meus anúncios</h1>
 
      {carregando ? (
        <p className="text-[#6B5B8C]">Carregando...</p>
      ) : erro ? (
        <p className="text-[#993C1D]">
          Não foi possível carregar seus anúncios agora. Tente novamente mais tarde.
        </p>
      ) : anuncios.length === 0 ? (
        <p className="text-[#6B5B8C]">Você ainda não tem anúncios.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {anuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              className="border border-[#E5E0F0] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                src={anuncio.imagemUrl}
                alt={anuncio.titulo}
                className="w-full h-40 object-cover bg-[#F1EEF8]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden";
                }}
              />
              <div className="p-4">
                <span className="text-xs text-[#4C1D95] font-semibold font-mono uppercase tracking-wide">
                  {anuncio.categoria}
                </span>
                <h3 className="font-bold text-[#1C0F33] mt-1">{anuncio.titulo}</h3>
                <div className="mt-3">
                  {anuncio.preco ? (
                    <span className="font-semibold text-[#1C0F33]">
                      R$ {anuncio.preco.toFixed(2)}
                    </span>
                  ) : (
                    <span className="inline-block text-xs font-semibold text-[#1C0F33] bg-[#C6F135] px-2.5 py-1 rounded-full">
                      Doação
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(anuncio.id)}
                  disabled={excluindoId === anuncio.id}
                  className="mt-4 text-sm text-[#993C1D] hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  {excluindoId === anuncio.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}