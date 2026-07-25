import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Vitrine } from "./components/Vitrine";
import { Footer } from "./components/Footer";
import { Anunciar } from "./pages/Anunciar";
import { MeusAnuncios } from "./pages/MeusAnuncios";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { RotaProtegida } from "./components/RotaProtegida";
 
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
 
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Stats />
                <Vitrine />
              </>
            }
          />
          <Route path="/anunciar" element={<RotaProtegida><Anunciar /></RotaProtegida>} />
          <Route path="/meus-anuncios" element={<RotaProtegida><MeusAnuncios /></RotaProtegida>} />


          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </main>
 
      <Footer />
    </div>
  );
}
 
export default App;