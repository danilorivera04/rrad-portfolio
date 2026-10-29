import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
  const openedWithPointer = useRef(false);
  const scrollFrame = useRef(0);
  const contentAnimation = useRef(null);

  useEffect(() => {
    const cancel = () => cancelAnimationFrame(scrollFrame.current);
    const events = ['wheel', 'touchstart', 'keydown', 'popstate', 'resize'];
    events.forEach((name) => window.addEventListener(name, cancel, { passive: true }));
    return () => {
      cancel();
      contentAnimation.current?.cancel();
      events.forEach((name) => window.removeEventListener(name, cancel));
    };
  }, []);
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
      dialog.dataset.pointerOpened = String(openedWithPointer.current);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!mobile) {
      const previouslyFocused = document.activeElement;
      dialog.show();
      // Non-modal navigation should not take focus when it first appears.
      if (!dialog.contains(previouslyFocused) && document.activeElement === dialog.querySelector('.sidebar-toggle')) {
        document.activeElement.blur();
        if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
      }
    }
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [mobile, isOpen]);

  useEffect(() => {
    let frame = 0;
    const sections = ['trabajos', 'acerca-de', 'contacto']
      .map((id) => document.getElementById(id)).filter(Boolean);
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * .35;
      let current = 'inicio';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id || current;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const observer = new ResizeObserver(schedule);
    const content = document.querySelector('.home-content');
    if (content) observer.observe(content);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, []);

  const closeMenu = async () => {
    if (!mobile) return;
    const dialog = dialogRef.current;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        await dialog.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }],
          { duration: 500, easing: 'cubic-bezier(.4, 0, .2, 1)' },
        ).finished;
      } catch { /* El cierre puede interrumpirse al cambiar de ruta o tamaño. */ }
    }
    if (!dialog.isConnected) return;
    dialog.close();
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };
  const compact = !mobile && collapsed;

  const toggleSidebar = () => {
    cancelAnimationFrame(scrollFrame.current);
    const content = document.querySelector('.home-content');
    const before = content?.getBoundingClientRect();
    const sections = [...document.querySelectorAll('.home-content > section')];
    const section = sections.find((element) => element.getBoundingClientRect().bottom > 32);
    // Keep the visible content anchored while the wider/narrower layout reflows.
    const candidates = section
      ? [section, ...section.querySelectorAll('.trabajo, .encabezado, .col-2, .contacto-contenido')]
      : [];
    const anchor = candidates.find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight;
    }) || section;
    const offset = anchor?.getBoundingClientRect().top;
    contentAnimation.current?.cancel();
    flushSync(() => setCollapsed((value) => !value));
    // Reflow and restore the reading position once, then animate on the compositor.
    if (anchor?.isConnected) {
      const delta = anchor.getBoundingClientRect().top - offset;
      window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
    }
    if (!content || !before || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const after = content.getBoundingClientRect();
    const sidebarDuration = parseFloat(getComputedStyle(dialogRef.current).getPropertyValue('--sidebar-duration')) || 800;
    contentAnimation.current = content.animate([
      { transform: `translateX(${before.left - after.left}px) scaleX(${before.width / after.width})`, transformOrigin: 'top left' },
      { transform: 'translateX(0) scaleX(1)', transformOrigin: 'top left' },
    ], { duration: sidebarDuration, easing: 'cubic-bezier(.4, 0, .2, 1)' });
  };

  const navigateSection = async (event, id) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    cancelAnimationFrame(scrollFrame.current);
    setActive(id);
    await closeMenu();
    if (!target.isConnected) return;
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(window.history.state, '', `#${id}`);
    }
    // Wait for the mobile dialog to release the page's scroll lock.
    scrollFrame.current = requestAnimationFrame(() => {
      const start = window.scrollY;
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const end = Math.max(0, Math.min(
        start + target.getBoundingClientRect().top - margin,
        document.documentElement.scrollHeight - window.innerHeight,
      ));
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const started = performance.now();
      const step = (now) => {
        const progress = preference.matches ? 1 : Math.min((now - started) / 1200, 1);
        const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
        if (progress < 1) scrollFrame.current = requestAnimationFrame(step);
      };
      step(started);
    });
  };

  return (
    <header className="portfolio-navigation" data-compact={compact}>
      <div className="mobile-header">
        <button type="button" className="sidebar-icon-button" ref={triggerRef}
          aria-label={es ? 'Abrir menú' : 'Open menu'} aria-controls="site-sidebar"
          aria-expanded={isOpen} aria-haspopup="dialog" onClick={(event) => {
            openedWithPointer.current = event.detail > 0;
            setIsOpen(true);
          }}><NavIcon name="menu" /></button>
        <img src="/assets/imagenes/logo.png" alt="RRAD" />
      </div>
      <dialog ref={dialogRef} id="site-sidebar" className="left-sidebar" aria-label={es ? 'Navegación' : 'Navigation'}
        onKeyDownCapture={() => { delete dialogRef.current.dataset.pointerOpened; }}
        onCancel={(event) => { event.preventDefault(); if (mobile) closeMenu(); }}
        onClick={(event) => { if (mobile && event.target === event.currentTarget) closeMenu(); }}>
        <div className="left-sidebar-inner">
          <button type="button" className="sidebar-icon-button sidebar-toggle"
            aria-label={mobile ? (es ? 'Cerrar menú' : 'Close menu') : compact ? (es ? 'Expandir menú' : 'Expand menu') : (es ? 'Contraer menú' : 'Collapse menu')}
            aria-expanded={mobile ? isOpen : !collapsed}
            onClick={(event) => {
              if (event.detail > 0) event.currentTarget.blur();
              if (mobile) closeMenu();
              else toggleSidebar();
            }}>
            <NavIcon name={mobile ? 'close' : 'menu'} />
          </button>
          <a href="#inicio" className="sidebar-brand" aria-label={es ? 'Danilo Rivera, inicio' : 'Danilo Rivera, home'} onClick={(event) => navigateSection(event, 'inicio')}>
            <img src="/assets/imagenes/logo.png" alt="" />
          </a>
          <nav className="left-sidebar-nav" style={{ '--active-index': Math.max(0, ['inicio', 'trabajos', 'acerca-de', 'contacto'].indexOf(active)) }} aria-label={es ? 'Navegación principal' : 'Main navigation'}>
            {[["inicio", es ? 'Inicio' : 'Home', 'home'], ["trabajos", t.works, 'projects'], ["acerca-de", t.about, 'about'], ["contacto", t.contact, 'contact']].map(([id, label, icon]) => (
              <a key={id} href={`#${id}`} onClick={(event) => navigateSection(event, id)} title={label} aria-label={label} aria-current={active === id ? 'location' : undefined}>
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
