# Desapego Universitário

Marketplace de economia circular para o campus da UNIFOR. A plataforma permite que estudantes cadastrem itens para doação ou venda (livros, calculadoras, jalecos, componentes eletrônicos, etc.), facilitando o acesso a materiais para quem está ingressando na universidade.

Projeto desenvolvido como desafio técnico do processo seletivo de estágio Full-Stack do Laboratório de Inovação Vortex (UNIFOR).

🔗 **Aplicação em produção:** https://desapego-universitario-v2.vercel.app
🔗 **API em produção:** https://desapego-universitario-cksr.onrender.com/anuncios

> O backend está hospedado no plano gratuito do Render, que hiberna após um período de inatividade. A primeira requisição depois de um tempo sem uso pode levar de 30 a 60 segundos para responder.

---

## Tecnologias utilizadas

### Backend
- **Node.js** + **TypeScript**
- **Express** — framework de rotas da API REST
- **Prisma ORM (v7)** — camada de acesso ao banco de dados
- **PostgreSQL** (hospedado no **Supabase**)
- **JWT** (jsonwebtoken) + **bcryptjs** — autenticação e criptografia de senhas
- **Zod** — validação de dados de entrada
- **tsx** — execução do TypeScript em desenvolvimento

### Frontend
- **React** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — estilização
- **React Router** — navegação entre páginas
- **Context API** — gerenciamento do estado de autenticação
- **lucide-react** — ícones
- **PWA** (Progressive Web App) — manifest + Service Worker com cache offline

### Infraestrutura
- **Render** — deploy do backend
- **Vercel** — deploy do frontend
- **Supabase** — banco de dados PostgreSQL

---

## Estrutura do projeto

```
desapego-universitario-v2/
├── backend/
│   ├── prisma/schema.prisma      # modelagem das tabelas User e Anuncio
│   └── src/
│       ├── server.ts              # ponto de entrada, configuração do Express
│       ├── lib/prisma.ts          # instância única do PrismaClient
│       ├── middlewares/auth.ts    # verificação do token JWT
│       ├── routes/                # usuarios.ts, anuncios.ts, auth.ts
│       └── schemas/               # validações com Zod
└── frontend/
    ├── public/                    # manifest.json, sw.js, ícones
    └── src/
        ├── components/            # Header, Hero, Stats, Vitrine, Footer
        ├── pages/                 # Login, Cadastro, Anunciar, MeusAnuncios
        ├── context/AuthContext.tsx
        └── App.tsx
```

---

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+
- Uma conta no [Supabase](https://supabase.com) (ou outro Postgres acessível), para o banco de dados

### 1. Clonar o repositório

```bash
git clone https://github.com/math109/desapego-universitario-v2.git
cd desapego-universitario-v2
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Cria um arquivo `.env` na pasta `backend/` com as variáveis:

```
DATABASE_URL="postgresql://usuario:senha@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://usuario:senha@host:5432/postgres"
JWT_SECRET="uma-frase-secreta-qualquer"
```

Cria as tabelas no banco:

```bash
npx prisma generate
npx prisma db push
```

Roda o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O backend sobe em `http://localhost:3333`.

### 3. Configurar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Cria um arquivo `.env` na pasta `frontend/` com:

```
VITE_API_URL=http://localhost:3333
```

Roda o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend sobe em `http://localhost:5173`.

> Observação: o registro do Service Worker (PWA) só ativa em build de produção (`npm run build` + `npm run preview`), não em `npm run dev` — isso é intencional, para evitar que o cache do Service Worker interfira no desenvolvimento.

---

## Funcionalidades

- Landing page pública com vitrine de anúncios e filtro por categoria
- Cadastro e login de usuários (JWT + senha criptografada com bcrypt)
- Criar, listar, filtrar e excluir anúncios
- Tela "Meus anúncios" (protegida por autenticação)
- PWA instalável — testado e confirmado em dispositivo Android real, abrindo em tela cheia sem a barra de endereço do navegador
- Funcionamento offline via Service Worker, com estratégia "rede primeiro, cache como reserva"
- Validação de dados com mensagens de erro específicas por campo
- Layout responsivo (desktop e mobile)

---

## Principais rotas da API

| Método | Rota | Descrição | Requer login |
|---|---|---|---|
| POST | `/usuarios` | Cria um novo usuário | Não |
| POST | `/auth/login` | Autentica e retorna um token JWT | Não |
| GET | `/anuncios` | Lista anúncios, com filtro opcional por categoria | Não |
| GET | `/anuncios/:id` | Busca um anúncio específico | Não |
| POST | `/anuncios` | Cria um novo anúncio | Sim |
| GET | `/anuncios/meus` | Lista os anúncios do usuário logado | Sim |
| DELETE | `/anuncios/:id` | Remove um anúncio (só o dono pode) | Sim |

---

## Diário de Bordo — Uso de Inteligência Artificial

### Ferramentas utilizadas

- **Gemini** — usado no início do projeto, como parceiro de arquitetura para decisão de stack tecnológica e geração dos comandos de inicialização (boilerplate) do Node.js, Prisma e Vite/React.
- **Claude (Anthropic)** — usado ao longo de todo o restante do desenvolvimento: debugging, explicações conceituais, decisões de segurança, validação, PWA e resolução de problemas de deploy.

### Estratégia de engenharia de prompts

Alguns exemplos reais de prompts usados para destravar problemas durante o desenvolvimento:

**1. Esqueleto próprio, pedindo ajuda para melhorar (header responsivo com tema roxo):**
> "estou fazendo um layout de aplicativo, me ajuda a melhorar esse esqueleto de header para esse projeto? tem que ser um layout com menu mobile já responsivo, quero um layout roxo"
 
```tsx
export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#2E1065] to-[#4C1D95]">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#F7F5FB]">Desapego</span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6F135]">
          Campus · Unifor
        </span>
      </div>
 
      <nav className="flex gap-6">
        <a href="#como-funciona" className="text-[#A78BFA] hover:text-[#F7F5FB]">
          Como funciona
        </a>
        <a href="#categorias" className="text-[#A78BFA] hover:text-[#F7F5FB]">
          Categorias
        </a>
        <a href="#vitrine" className="text-[#A78BFA] hover:text-[#F7F5FB]">
          Ver anúncios
        </a>
      </nav>
 
      <div className="flex items-center gap-4">
        <a href="/entrar" className="text-[#F7F5FB] opacity-85 hover:opacity-100">
          Entrar
        </a>
        <a
          href="/anunciar"
          className="rounded-full bg-[#C6F135] px-5 py-2 text-sm font-semibold text-[#1C0F33] hover:-translate-y-0.5 transition-transform"
        >
          Anunciar item
        </a>
      </div>
    </header>
  );
}
```
 
Esse prompt partiu de um esqueleto que eu mesmo montei, já com a paleta de cor definida, mas pedindo ajuda para transformá-lo num componente responsivo de verdade, com menu mobile — o resultado disso guiou toda a identidade visual do restante da landing page (roxo escuro `#2E1065`/`#4C1D95` com acento em verde-lima `#C6F135`).
 
**2. Estruturação do Service Worker do PWA:**
> "Estou fazendo o PWA do meu projeto e preciso estruturar o Service Worker. Já tenho um manifest.json configurado. Preciso que o Service Worker: faça cache das rotas essenciais na instalação, incluindo a raiz e o manifest; limpe versões antigas de cache na ativação, pra não ficar acumulando cache de deploys anteriores; use uma estratégia de 'rede primeiro, cache como reserva' nas requisições — sempre tenta buscar da internet primeiro, e só cai pro cache se a rede falhar; no caso de navegação entre páginas offline (não arquivos como JS/CSS), tenha um fallback pra página inicial. Pode estruturar isso pra mim, explicando cada evento?"
 
Esse prompt gerou a estrutura completa do `sw.js`, cobrindo os três eventos do ciclo de vida do Service Worker (`install`, `activate`, `fetch`) e a estratégia de cache usada no projeto.
 
**3. Arquitetura de proteção de rotas com middleware de autenticação:**
> "Tenho rotas de anúncios num backend Express e TypeScript, e algumas delas só podem ser acessadas por usuários logados (criar anúncio, listar meus anúncios, deletar), enquanto outras precisam continuar públicas (listar todos, buscar por ID). Como estruturar um middleware de autenticação que valide um token JWT no header, extraia o ID do usuário de dentro do token, e proteja só as rotas específicas — deixando as outras sem essa exigência? Preciso que, se o token faltar ou for inválido, a rota nem rode."
 
Esse prompt resultou no `authMiddleware`, que confere a assinatura do token JWT e injeta o ID do usuário na requisição antes de liberar a passagem pra rota protegida — usado seletivamente só nas rotas que exigem login.
 
### Chats usados
 
- **Frontend e BackEnd:** https://claude.ai/share/e9ff2ef9-58be-44c5-aee9-6ebf7978d50c
- **Esqueleto e Ritmo do Projeto:** https://claude.ai/share/866c336d-cb88-4a98-be27-93b45d549788
### Reflexão crítica
 
Ao longo do projeto, tive vários momentos em que precisei revisar criticamente o código gerado, em vez de aceitá-lo diretamente:
 
**Tags `<a>` incompletas (erro recorrente).** Em mais de uma ocasião, a IA gerou esqueletos de componentes React com tags `<a>` sem a abertura `<a` — só os atributos soltos, o que quebraria a compilação do JSX. Identifiquei o padrão comparando com a estrutura esperada das outras tags, e como o erro se repetiu mais de uma vez nos códigos gerados, passei a revisar esse tipo de tag com mais atenção antes de aceitar qualquer sugestão nova.
 
```tsx
export function Hero() {
  return (
    <section className="text-center py-16 px-6 bg-green-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Dê uma nova vida ao que você não usa mais
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        O Desapego Universitário conecta estudantes para doar ou vender livros,
        calculadoras, jalecos e outros itens do campus — promovendo economia
        circular e ajudando quem está começando a graduação.
      </p>
      <div className="flex gap-4 justify-center">
        href="#vitrine"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Buscar itens
        </a>
        href="/anunciar"
        className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50"
        >
          Anunciar um item
        </a>
      </div>
    </section>
  );
}
```
 
**Bloco try/catch malformado e hash duplicado na rota de cadastro.** Um trecho de backend gerado pela IA para criar usuários veio com um `try` externo sem seu próprio `catch`/`finally` — só o `try` interno tinha um —, o que deixava as chaves desencontradas e quebraria a compilação do TypeScript. Além disso, a IA duplicou a chamada `bcrypt.hash(senha, 10)`, hasheando a senha duas vezes à toa: uma vez fora do `try` interno, sem uso nenhum, e outra dentro dele. Percebi os dois problemas revisando a estrutura do código antes de aceitar — identifiquei que as chaves não fechavam corretamente e que havia uma variável recalculada sem necessidade — e corrigi juntando os dois blocos num único `try/catch` e removendo a chamada de hash redundante.

---

## Autor

Desenvolvido por Matheus Martins para o processo seletivo de estágio Full-Stack do Laboratório Vortex (UNIFOR) — 2026.
