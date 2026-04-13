import "./Header.css";
import DarkModeSwitch from "../DarkModeSwitch";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img className="logo-rrad" src="./logo.png"
            alt="Logo de la marca" />
          <div className="logo-texto">
            <h2 className="titulo">Danilo Rivera</h2>
            <p className="subtitulo">Ingeniero en Sistemas Computacionales</p>
          </div>
        </div>
        <nav className="navbar">
          <a href="#trabajos">Trabajos</a>
          <a href="#acerca-de">Acerca de</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <DarkModeSwitch></DarkModeSwitch>
      </header>
    </>
  );
};

export default Header;
