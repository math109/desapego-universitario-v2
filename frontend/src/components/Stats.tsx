function LoopDivider() {
  return (
    <svg
      className="w-5 h-5 shrink-0 opacity-60 rotate-90 sm:rotate-0"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 4C11.16 4 4 11.16 4 20" stroke="#C6F135" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M20 36C28.84 36 36 28.84 36 20" stroke="#A78BFA" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
 
export function Stats() {
  return (
    <section className="px-8 -mt-16 relative z-10">
      <div className="max-w-4xl mx-auto bg-[#1C0F33] rounded-2xl shadow-2xl px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="text-center">
          <p className="text-3xl font-bold text-[#C6F135]">120+</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#A78BFA]">
            itens desapegados
          </p>
        </div>
 
        <LoopDivider />
 
        <div className="text-center">
          <p className="text-3xl font-bold text-[#C6F135]">85</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#A78BFA]">
            estudantes ativos
          </p>
        </div>
 
        <LoopDivider />
 
        <div className="text-center">
          <p className="text-3xl font-bold text-[#C6F135]">6</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#A78BFA]">
            categorias disponíveis
          </p>
        </div>
      </div>
    </section>
  );
}