import { Route, Routes } from "react-router-dom";
import Header from "./componentes/layout/Header";
import Hero from "./componentes/layout/Hero";
import Clientes from "./componentes/layout/Clientes";
import Trabajos from "./componentes/layout/Trabajos";
import AcercaDe from "./componentes/layout/AcercaDe";
import Contacto from "./componentes/layout/Contacto";
import Footer from "./componentes/layout/Footer";
import CVPage from "./componentes/layout/CVPage";

// Vista principal del portafolio (landing existente).
const HomePage = () => (
  <div className="contenedor">
    <Header></Header>
    <Hero></Hero>
    <Clientes></Clientes>
    <Trabajos></Trabajos>
    <AcercaDe></AcercaDe>
    <Contacto></Contacto>
    <Footer></Footer>
  </div>
);

function App() {
  return (
    // Enrutador principal: "/" para landing y "/cv" para la nueva vista de CV.
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cv" element={<CVPage />} />
    </Routes>
  );
}
export default App;
