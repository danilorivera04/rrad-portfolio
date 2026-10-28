import "./Header.css";
import { useEffect, useRef, useState } from "react";
import DarkModeSwitch from "../../DarkModeSwitch";
import { Link } from "react-router-dom";
import { getHomeTexts } from "./data/homeTexts";

const Header = ({ language = "en", onLanguageChange }) => {
  const t = getHomeTexts(language).header;
  const es = language === "es";
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => {
    dialogRef.current.close();
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="header">
      <div className="logo">
        <img className="logo-rrad" src="/assets/imagenes/logo.png" alt="RRAD" />
        <div className="logo-texto">
          <h2 className="titulo">Danilo Rivera</h2>
          <p className="subtitulo">{t.subtitle}</p>
        </div>
      </div>
      <button className="menu-trigger" type="button" ref={triggerRef}
        aria-label={es ? "Abrir menú" : "Open menu"}
        aria-expanded={isOpen} aria-controls="site-sidebar" aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}>
        <span>{es ? "Menú" : "Menu"}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 7h16M9 12h11M4 17h16" />
        </svg>
      </button>

      <dialog ref={dialogRef} id="site-sidebar" className="site-sidebar"
        aria-labelledby="sidebar-title"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="sidebar-panel">
          <div className="sidebar-heading">
            <div>
              <span className="sidebar-eyebrow">RRAD / PORTFOLIO</span>
              <h2 id="sidebar-title">{es ? "Explora" : "Explore"}</h2>
            </div>
            <button type="button" className="sidebar-close" onClick={closeMenu}
              aria-label={es ? "Cerrar menú" : "Close menu"} autoFocus>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="m6 6 12 12M6 18 18 6" />
              </svg>
            </button>
          </div>
          <nav className="sidebar-nav" aria-label={es ? "Navegación principal" : "Main navigation"}>
            {[["#trabajos", t.works], ["#acerca-de", t.about], ["#contacto", t.contact]].map(([href, label], index) => (
              <a key={href} href={href} onClick={closeMenu}>
                <span className="nav-number" aria-hidden="true">0{index + 1}</span>
                <span>{label}</span><span className="nav-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
            <Link to="/cv" onClick={closeMenu}>
              <span className="nav-number" aria-hidden="true">04</span>
              <span>{t.cv}</span><span className="nav-arrow" aria-hidden="true">↗</span>
            </Link>
          </nav>
          <div className="sidebar-preferences">
            <div className="sidebar-setting">
              <span id="sidebar-language">{es ? "Idioma" : "Language"}</span>
              <div className="sidebar-languages" role="group" aria-labelledby="sidebar-language">
                {["en", "es"].map((value) => (
                  <button key={value} type="button" aria-pressed={language === value}
                    aria-label={value === "en" ? "English" : "Español"}
                    onClick={() => onLanguageChange?.(value)}>{value.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="sidebar-setting">
              <span>{es ? "Apariencia" : "Appearance"}</span>
              <DarkModeSwitch id="sidebar-dark-mode" label={es ? "Modo oscuro" : "Dark mode"} />
            </div>
            <p className="sidebar-signature">Danilo Rivera<span>{t.subtitle}</span></p>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Header;
