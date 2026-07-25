import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
 
const API_URL = import.meta.env.VITE_API_URL;
 
const inputClasses =
  "w-full border border-[#E5E0F0] rounded-lg px-4 py-2.5 text-[#1C0F33] placeholder:text-[#A79BC2] outline-none focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/20 transition-colors";
 
export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
 
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        setErro(data.erro || "Erro ao fazer login.");
        return;
      }
 
      login(data.token, data.usuario);
      navigate("/");
    } catch (err) {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }
 
  return (
    <section className="h-full bg-[#F7F5FB] py-16 px-6 flex items-center justify-center">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4C1D95]">
            Bem-vindo de volta
          </span>
          <h1 className="text-2xl font-bold text-[#1C0F33] mt-1">Entrar na sua conta</h1>
        </div>
 
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-[#E5E0F0] p-6 flex flex-col gap-5"
        >
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="voce@aluno.unifor.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
 
          <div>
            <label className="block text-xs font-semibold text-[#6B5B8C] uppercase tracking-wide mb-1.5">
              Senha
            </label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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
          </div>
 
          {erro && <p className="text-[#993C1D] text-sm">{erro}</p>}
 
          <button
            type="submit"
            disabled={carregando}
            className="bg-[#C6F135] text-[#1C0F33] px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:translate-y-0"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
 
        <p className="text-sm text-[#6B5B8C] text-center mt-6">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-[#4C1D95] font-semibold hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
}