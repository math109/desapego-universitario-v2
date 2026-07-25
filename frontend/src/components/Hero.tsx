export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#4C1D95] to-[#2E1065] px-8 pt-16 pb-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="text-left">
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-[#C6F135] mb-5">
            Economia circular · Campus Unifor
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F7F5FB] leading-tight mb-6">
            Dê uma nova vida ao que você não usa mais
          </h1>
          <p className="text-lg text-[#C9BEEA] max-w-xl mb-8">
            O Desapego Universitário conecta estudantes para doar ou vender livros,
            calculadoras, jalecos e outros itens do campus — ajudando quem está
            começando a graduação.
          </p>
          <div className="flex gap-4">
            <a
              href="#vitrine"
              className="bg-[#C6F135] text-[#1C0F33] px-6 py-3 rounded-lg font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Buscar itens
            </a>
            <a
              href="/anunciar"
              className="border border-[#A78BFA] text-[#F7F5FB] px-6 py-3 rounded-lg font-semibold hover:bg-white/5 transition-colors"
            >
              Anunciar um item
            </a>
          </div>
        </div>
 
        {/* Mockup de cards inclinados — assinatura visual */}
        <div className="relative h-72 hidden lg:block">
          <div className="absolute top-4 left-4 w-56 rotate-[-6deg] rounded-xl bg-white/95 shadow-2xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wide text-[#4C1D95] font-semibold">
              Livros
            </span>
            <p className="font-bold text-[#1C0F33] text-sm mt-1">Cálculo I — Stewart</p>
            <p className="text-xs text-[#6B5B8C] mt-1">6ª edição, poucas marcações</p>
            <p className="mt-3 text-sm font-semibold text-[#4C1D95]">R$ 45,00</p>
          </div>
 
          <div className="absolute top-24 left-40 w-56 rotate-[4deg] rounded-xl bg-white/95 shadow-2xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wide text-[#4C1D95] font-semibold">
              Saúde
            </span>
            <p className="font-bold text-[#1C0F33] text-sm mt-1">Jaleco branco M</p>
            <p className="text-xs text-[#6B5B8C] mt-1">Usado por 1 semestre</p>
            <span className="mt-3 inline-block text-xs font-semibold text-[#1C0F33] bg-[#C6F135] px-2 py-0.5 rounded-full">
              Doação
            </span>
          </div>
 
          <div className="absolute top-2 left-64 w-52 rotate-[10deg] rounded-xl bg-white/95 shadow-2xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wide text-[#4C1D95] font-semibold">
              Engenharia
            </span>
            <p className="font-bold text-[#1C0F33] text-sm mt-1">HP 12C emulada</p>
            <p className="text-xs text-[#6B5B8C] mt-1">Científica, funciona 100%</p>
            <p className="mt-3 text-sm font-semibold text-[#4C1D95]">R$ 30,00</p>
          </div>
        </div>
      </div>
    </section>
  );
}