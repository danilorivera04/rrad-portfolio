import { useEffect } from 'react';

// El contenido permanece visible si el navegador no admite las animaciones.
export default function useScrollReveal(pageRef) {
    useEffect(() => {
        const page = pageRef.current;
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!page || !('IntersectionObserver' in window)) return;

        const selector = '.trabajos > .encabezado, .trabajos > .filtros, .trabajo, .acerca-de .col-1, .acerca-de .col-2, .contacto-contenido';
        const seen = new WeakSet();
        const reveal = (element) => element.classList.remove('reveal-pending');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ target, isIntersecting }) => {
                if (isIntersecting) {
                    reveal(target);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.08 });

        const register = () => {
            page.querySelectorAll(selector).forEach((element) => {
                if (seen.has(element)) return;
                seen.add(element);
                element.classList.add('scroll-reveal');
                if (!preference.matches && element.getBoundingClientRect().top >= 0) {
                    element.classList.add('reveal-pending');
                    observer.observe(element);
                }
            });
        };
        const reduceMotion = () => {
            if (preference.matches) {
                observer.disconnect();
                page.querySelectorAll('.reveal-pending').forEach(reveal);
            }
        };
        const onFocus = (event) => {
            const element = event.target.closest('.reveal-pending');
            if (element) {
                reveal(element);
                observer.unobserve(element);
            }
        };
        register();
        const mutations = new MutationObserver(register);
        mutations.observe(page, { childList: true, subtree: true });
        preference.addEventListener('change', reduceMotion);
        page.addEventListener('focusin', onFocus);
        return () => {
            observer.disconnect();
            mutations.disconnect();
            preference.removeEventListener('change', reduceMotion);
            page.removeEventListener('focusin', onFocus);
            page.querySelectorAll('.scroll-reveal').forEach((element) => {
                element.classList.remove('scroll-reveal', 'reveal-pending');
            });
        };
    }, [pageRef]);
}
