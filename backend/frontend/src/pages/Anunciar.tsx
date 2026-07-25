import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
const CATEGORIAS = ["Livros", "Engenharia", "Computação"];
// em produção, defina VITE_API_URL no .env (ex: VITE_API_URL=https://sua-api.onrender.com)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
 
const inputClasses =
  "w-full border border-[#E5E0F0] rounded-lg px-4 py-2.5 text-[#1C0F33] placeholder:text-[#A79BC2] outline-none focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/20 transition-colors";
 
export function Anunciar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: CATEGORIAS[0],
    preco: "",
    imagemUrl: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [imagemQuebrada, setImagemQuebrada] = useState(false);
  const { token } = useAuth();
 
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (e.target.name === "imagemUrl") setImagemQuebrada(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  function handleCategoria(cat: string) {
    setForm({ ...form, categoria: cat });
  }
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
 
    try {
      const res = await fetch(`${API_URL}/anuncios`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        ...form,
        preco: form.preco ? Number(form.preco) : null,
        // sem usuarioId — o backend descobre pelo token
        }),
      });
 
      if (!res.ok) throw new Error("Erro ao criar anúncio");
 
      navigate("/meus-anuncios");
    } catch (err) {
      setErro("Não foi possível criar o anúncio. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }
 
  return (
    <section className="min-h-screen bg-[#F7F5FB] py-16 px-6">
      <div className="max-w-lg mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4C1D95]">
          Novo anúncio
        </span>
        <h1 className="text-2xl font-bold text-[#1C0F33] mt-1 mb-8">
          Dê uma nova vida ao seu item
        </h1>
 
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-[#E5E0F0] p-6 flex flex-col gap-5"
        >
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Título
            </label>
            <input
              name="titulo"
              placeholder="Ex: Cálculo I — Stewart, 6ª edição"
              value={form.titulo}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Descrição
            </label>
            <textarea
              name="descricao"
              placeholder="Conte o estado do item, se tem marcações, há quanto tempo usa..."
              value={form.descricao}
              onChange={handleChange}
              required
              rows={3}
              className={`${inputClasses} resize-none`}
            />
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Categoria
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoria(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    form.categoria === cat
                      ? "bg-[#4C1D95] text-white border-[#4C1D95]"
                      : "text-[#6B5B8C] border-[#D8CFEA] hover:border-[#4C1D95] hover:text-[#4C1D95]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Preço
            </label>
            <input
              name="preco"
              type="number"
              placeholder="Deixe vazio se for doação"
              value={form.preco}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              URL da imagem
            </label>
            <input
              name="imagemUrl"
              placeholder="https://..."
              value={form.imagemUrl}
              onChange={handleChange}
              required
              className={inputClasses}
            />
            {form.imagemUrl && (
              <div className="mt-3 w-full h-32 rounded-lg overflow-hidden bg-[#F1EEF8] border border-[#E5E0F0]">
                {!imagemQuebrada && (
                  <img
                    src={form.imagemUrl}
                    alt="Pré-visualização"
                    className="w-full h-full object-cover"
                    onError={() => setImagemQuebrada(true)}
                  />
                )}
              </div>
            )}
          </div>
 
          {erro && <p className="text-[#993C1D] text-sm">{erro}</p>}
 
          <button
            type="submit"
            disabled={enviando}
            className="bg-[#C6F135] text-[#1C0F33] px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:translate-y-0"
          >
            {enviando ? "Enviando..." : "Publicar anúncio"}
          </button>
        </form>
      </div>
    </section>
  );
}