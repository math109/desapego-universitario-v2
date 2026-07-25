import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
 
const LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#categorias", label: "Categorias" },
  { href: "#vitrine", label: "Ver anúncios" },
];
 
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const { usuario, logout } = useAuth();
 
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2E1065]/90 backdrop-blur-md shadow-lg shadow-[#1C0F33]/20"
          : "bg-gradient-to-r from-[#2E1065] to-[#4C1D95]"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/logo-512.png"
            alt="Logo Desapego Universitário"
            className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:rotate-[20deg]"
          />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-[#F7F5FB]">Desapego</span>
            <span className="hidden sm:inline mt-1 text-[10px] font-mono uppercase tracking-widest text-[#C6F135]">
              Campus · Unifor
            </span>
          </div>
        </a>
 
        <nav className="hidden md:flex gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm text-[#A78BFA] hover:text-[#F7F5FB] transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-[#C6F135] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>
 
        <div className="hidden md:flex items-center gap-4">
          {usuario ? (
        <button onClick={logout} className="text-sm text-[#F7F5FB] opacity-85 hover:opacity-100">
          Sair
        </button>
        ) : (
        <a href="/login" className="text-sm text-[#F7F5FB] opacity-85 hover:opacity-100">
          Entrar
        </a>
        )}
          <a
            href="/anunciar"
            className="rounded-full bg-[#C6F135] px-5 py-2 text-sm font-semibold text-[#1C0F33] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#C6F135]/30 transition-all duration-200"
          >
            Anunciar item
          </a>
        </div>
 
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden text-[#F7F5FB] p-2"
          aria-label="Abrir menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-300" style={{ transform: menuAberto ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-300" style={{ opacity: menuAberto ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-current transition-transform duration-300" style={{ transform: menuAberto ? "translateY(-8px) rotate(-45deg)" : "none" }} />
        </button>
      </div>
 
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuAberto ? "max-h-64 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="text-[#A78BFA] hover:text-[#F7F5FB] text-sm"
            >
              {link.label}
            </a>
          ))}
          <a href="/entrar" className="text-[#F7F5FB] text-sm pt-2 border-t border-white/10">
            Entrar
          </a>
          <a
            href="/anunciar"
            className="rounded-full bg-[#C6F135] px-5 py-2.5 text-sm font-semibold text-[#1C0F33] text-center mt-1"
          >
            Anunciar item
          </a>
        </div>
      </div>
    </header>
  );
}