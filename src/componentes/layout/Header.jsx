import "./Header.css";
import DarkModeSwitch from "../DarkModeSwitch";
import { Link } from "react-router-dom";

// Encabezado principal con marca, navegacion y selector de tema.
const Header = () => {
  return (
    <>
      <header className="header">
        {/* Identidad visual (logo + nombre profesional) */}
        <div className="logo">
          <img className="logo-rrad" src="./logo.png"
            alt="Logo de la marca" />
          <div className="logo-texto">
            <h2 className="titulo">Danilo Rivera</h2>
            <p className="subtitulo">Ingeniero en Sistemas Computacionales</p>
          </div>
        </div>
        {/* Navegacion interna por anclas a secciones */}
        <nav className="navbar">
          <a href="#trabajos">Trabajos</a>
          <a href="#acerca-de">Acerca de</a>
          <a href="#contacto">Contacto</a>
          <Link to="/cv">Mi CV</Link>

        </nav>
        <DarkModeSwitch></DarkModeSwitch>
      </header>
    </>
  );
};

export default Header;
