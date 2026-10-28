import "./Header.css";
import { useEffect, useRef, useState } from "react";
import DarkModeSwitch from "../../DarkModeSwitch";
import { Link } from "react-router-dom";
import { getHomeTexts } from "./data/homeTexts";

const paths = {
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "m6 6 12 12M6 18 18 6",
  projects: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  about: "M8 7a4 4 0 1 0 8 0 4 4 0 1 0-8 0M4 21v-2a8 8 0 0 1 16 0v2",
  contact: "M4 4h16v12H8l-4 4zM8 8h8M8 12h5",
  cv: "M5 3h10l4 4v14H5zM14 3v5h5M9 12h6M9 16h6",
  home: "m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8",
};
const NavIcon = ({ name }) => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;

const Header = ({ language = "en", onLanguageChange }) => {
  const t = getHomeTexts(language).header;
  const es = language === "es";
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [collapsed, setCollapsed] = useState(() => window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(() => window.location.hash.slice(1) || 'inicio');

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
    const resize = () => {
      setMobile(mobileQuery.matches);
      setCollapsed(tabletQuery.matches);
      setIsOpen(false);
    };
    mobileQuery.addEventListener('change', resize);
    tabletQuery.addEventListener('change', resize);
    return () => {
      mobileQuery.removeEventListener('change', resize);
      tabletQuery.removeEventListener('change', resize);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    if (mobile && isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!mobile) {
      dialog.show();
    }
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [mobile, isOpen]);

  useEffect(() => {
    const update = () => {
      setActive(window.location.hash.slice(1) || 'inicio');
    };
    update();
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('hashchange', update);
    };
  }, []);

  const closeMenu = async () => {
    if (!mobile) return;
    const dialog = dialogRef.current;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        await dialog.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }],
          { duration: 300, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        ).finished;
      } catch { /* El cierre puede interrumpirse al cambiar de ruta o tamaño. */ }
    }
    if (!dialog.isConnected) return;
    dialog.close();
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const compact = !mobile && collapsed;

  return (
    <header className="portfolio-navigation" data-compact={compact}>
      <div className="mobile-header">
        <img src="/assets/imagenes/logo.png" alt="RRAD" />
        <span>Danilo Rivera</span>
        <button type="button" className="sidebar-icon-button" ref={triggerRef}
          aria-label={es ? 'Abrir menú' : 'Open menu'} aria-controls="site-sidebar"
          aria-expanded={isOpen} aria-haspopup="dialog" onClick={() => setIsOpen(true)}><NavIcon name="menu" /></button>
      </div>
      <dialog ref={dialogRef} id="site-sidebar" className="left-sidebar" aria-label={es ? 'Navegación' : 'Navigation'}
        onCancel={(event) => { event.preventDefault(); if (mobile) closeMenu(); }}
        onClick={(event) => { if (mobile && event.target === event.currentTarget) closeMenu(); }}>
        <div className="left-sidebar-inner">
          <button type="button" className="sidebar-icon-button sidebar-toggle"
            aria-label={mobile ? (es ? 'Cerrar menú' : 'Close menu') : compact ? (es ? 'Expandir menú' : 'Expand menu') : (es ? 'Contraer menú' : 'Collapse menu')}
            aria-expanded={mobile ? isOpen : !collapsed}
            onClick={() => mobile ? closeMenu() : setCollapsed(!collapsed)}>
            <NavIcon name={mobile ? 'close' : 'menu'} />
          </button>
          <a href="#inicio" className="sidebar-brand" aria-label={es ? 'Danilo Rivera, inicio' : 'Danilo Rivera, home'} onClick={closeMenu}>
            <img src="/assets/imagenes/logo.png" alt="" />
            <span className="sidebar-expanded"><strong>Danilo Rivera</strong><small>{t.subtitle}</small></span>
          </a>
          <nav className="left-sidebar-nav" aria-label={es ? 'Navegación principal' : 'Main navigation'}>
            {[["inicio", es ? 'Inicio' : 'Home', 'home'], ["trabajos", t.works, 'projects'], ["acerca-de", t.about, 'about'], ["contacto", t.contact, 'contact']].map(([id, label, icon]) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} title={label} aria-label={label} aria-current={active === id ? 'location' : undefined}>
                <NavIcon name={icon} /><span className="sidebar-expanded">{label}</span>
              </a>
            ))}
            <Link to="/cv" onClick={closeMenu} title={t.cv} aria-label={t.cv}><NavIcon name="cv" /><span className="sidebar-expanded">{t.cv}</span></Link>
          </nav>
          <div className="left-sidebar-settings">
            <div className="sidebar-setting">
              <span className="sidebar-expanded">{es ? 'Idioma' : 'Language'}</span>
              <div className="sidebar-languages" role="group" aria-label={es ? 'Idioma' : 'Language'}>
                {['en', 'es'].map((value) => <button key={value} type="button" aria-pressed={language === value} aria-label={value === 'en' ? 'English' : 'Español'} onClick={() => onLanguageChange?.(value)}>{value.toUpperCase()}</button>)}
              </div>
            </div>
            <div className="sidebar-setting">
              <span className="sidebar-expanded">{es ? 'Apariencia' : 'Appearance'}</span>
              <DarkModeSwitch id="sidebar-dark-mode" label={es ? 'Modo oscuro' : 'Dark mode'} />
            </div>
            <span className="sidebar-caption sidebar-expanded">RRAD / PORTFOLIO</span>
          </div>
        </div>
      </dialog>
    </header>
  );
};
export default Header;
