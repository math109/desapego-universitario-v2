import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
 
const API_URL = import.meta.env.VITE_API_URL;
 
const inputClasses =
  "w-full border border-[#E5E0F0] rounded-lg px-4 py-2.5 text-[#1C0F33] placeholder:text-[#A79BC2] outline-none focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/20 transition-colors";
 
export function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erros, setErros] = useState<Record<string, string[]>>({});
  const [erroGeral, setErroGeral] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
 
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErroGeral("");
    setErros({});
    setCarregando(true);
 
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
 
    if (!res.ok) {
      if (data.detalhes) {
        setErros(data.detalhes);
      } else {
        setErroGeral(data.erro || "Erro ao criar conta.");
      }
      return;
    }
 
      navigate("/login");
    } catch (err) {
      setErroGeral("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }
 
  return (
    <section className="h-full bg-[#F7F5FB] py-16 px-6 flex items-center justify-center">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4C1D95]">
            Comece por aqui
          </span>
          <h1 className="text-2xl font-bold text-[#1C0F33] mt-1">Criar conta</h1>
        </div>
 
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-[#E5E0F0] p-6 flex flex-col gap-5"
        >
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Nome
            </label>
            <input
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
              autoComplete="name"
              className={inputClasses}
            />
            {erros.nome && <p className="text-red-600 text-sm">{erros.nome[0]}</p>}
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="voce@aluno.unifor.br"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={inputClasses}
            />
            {erros.email && <p className="text-red-600 text-sm">{erros.email[0]}</p>}
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Senha
            </label>
            <div className="relative">
            <input
              name="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>

            {erros.senha && <p className="text-red-600 text-sm">{erros.senha[0]}</p>}
          </div>
 
          {erroGeral && <p className="text-[#993C1D] text-sm">{erroGeral}</p>}
 
          <button
            type="submit"
            disabled={carregando}
            className="bg-[#C6F135] text-[#1C0F33] px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:translate-y-0"
          >
            {carregando ? "Criando..." : "Criar conta"}
          </button>
        </form>
 
        <p className="text-sm text-[#6B5B8C] text-center mt-6">
          Já tem conta?{" "}
          <Link to="/login" className="text-[#4C1D95] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}