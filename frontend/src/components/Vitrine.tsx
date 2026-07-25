import { useEffect, useState } from "react";
 
interface Anuncio {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number | null;
  imagemUrl: string;
}
 
const CATEGORIAS = ["Todos", "Livros", "Engenharia", "Computação"];
 
// em produção, defina VITE_API_URL no .env (ex: VITE_API_URL=https://sua-api.onrender.com)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
 
export function Vitrine() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [categoria, setCategoria] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
 
  useEffect(() => {
    setCarregando(true);
    setErro(false);
 
    const url =
      categoria === "Todos"
        ? `${API_URL}/anuncios`
        : `${API_URL}/anuncios?categoria=${categoria}`;
 
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => setAnuncios(data))
      .catch((err) => {
        console.error("Erro ao buscar anúncios:", err);
        setErro(true);
      })
      .finally(() => setCarregando(false));
  }, [categoria]);
 
  return (
    <section id="vitrine" className="max-w-5xl mx-auto pt-20 pb-16 px-6">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4C1D95]">
          Vitrine
        </span>
        <h2 className="text-2xl font-bold text-[#1C0F33] mt-1">Últimos anúncios</h2>
      </div>
 
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              categoria === cat
                ? "bg-[#4C1D95] text-white border-[#4C1D95]"
                : "text-[#6B5B8C] border-[#D8CFEA] hover:border-[#4C1D95] hover:text-[#4C1D95]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
 
      {carregando ? (
        <p className="text-[#6B5B8C]">Carregando anúncios...</p>
      ) : erro ? (
        <p className="text-[#993C1D]">
          Não foi possível carregar os anúncios agora. Tente novamente mais tarde.
        </p>
      ) : anuncios.length === 0 ? (
        <p className="text-[#6B5B8C]">Nenhum anúncio encontrado nessa categoria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {anuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              className="border border-[#E5E0F0] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
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
                <p className="text-sm text-[#6B5B8C] line-clamp-2 mt-1">{anuncio.descricao}</p>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}