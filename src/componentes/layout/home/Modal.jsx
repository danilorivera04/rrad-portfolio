import './Modal.css';
import { useEffect, useState } from 'react';
import { CloseIcon, GitIcon, RightArrowIcon, RocketIcon } from './icons/SVGIcons';

const AUTO_SLIDE_DELAY = 5000;
const SLIDE_TRANSITION = 300;

const normalizarGaleria = (trabajo) => {
    const baseGaleria = trabajo.galeria?.length ? trabajo.galeria : [trabajo.thumb];

    // If the project has at least 3 images return all of them.
    // If it has fewer than 3, duplicate entries until there are 3.
    if (baseGaleria.length >= 3) return baseGaleria;

    const imagenes = baseGaleria.slice();
    while (imagenes.length < 3) {
        imagenes.push(baseGaleria[imagenes.length % baseGaleria.length]);
    }

    return imagenes;
};

// Muestra el detalle de un trabajo seleccionado y permite cerrar el modal.
const Modal = ({ closeModal, trabajo }) => {
    const imagenes = normalizarGaleria(trabajo);
    const esGaleriaVertical = trabajo.formatoGaleria === 'vertical';
    const esAppMovil = trabajo.categoria === 'aplicaciones-moviles';
    const demoUrl = trabajo.demoUrl;
    const githubUrl = trabajo.githubUrl;
    const [slideActual, setSlideActual] = useState(0);
    const [reiniciosAutoplay, setReiniciosAutoplay] = useState(0);

    // Cerrar modal con tecla ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    useEffect(() => {
        if (imagenes.length <= 1) {
            return undefined;
        }

        const timerId = window.setInterval(() => {
            setSlideActual((slideActualAnterior) => (slideActualAnterior + 1) % imagenes.length);
        }, AUTO_SLIDE_DELAY);

        return () => window.clearInterval(timerId);
    }, [imagenes.length, reiniciosAutoplay]);

    const irASlide = (index) => {
        setSlideActual(index);
        setReiniciosAutoplay((valorAnterior) => valorAnterior + 1);
    };

    const siguienteSlide = () => {
        irASlide((slideActual + 1) % imagenes.length);
    };

    const anteriorSlide = () => {
        irASlide((slideActual - 1 + imagenes.length) % imagenes.length);
    };

    return (
        <div className="overlay" id="overlay" onClick={closeModal} role="presentation">
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
                {/* Boton de cierre explicito */}
                <button
                    className="boton-cerrar"
                    id="btn-cerrar"
                    onClick={closeModal}
                    aria-label="Cerrar modal"
                >
                    <CloseIcon width={16} height={16} />
                </button>
                {/* Grid con miniatura y descripcion del proyecto */}
                <div className="grid">
                    <div className="thumb">
                        <div
                            className={`slideshow${esGaleriaVertical ? ' vertical' : ''}`}
                            aria-label={`Galería de ${trabajo.info.nombre}`}
                        >
                            <div
                                className="slides"
                                style={{
                                    transform: `translate3d(-${slideActual * 100}%, 0, 0)`,
                                    transition: `transform ${SLIDE_TRANSITION}ms ease-out`,
                                }}
                            >
                                {imagenes.map((imagen, index) => (
                                    <div className="slide" key={`${imagen.url}-${index}`}>
                                        <img src={imagen.url} alt={imagen.alt || trabajo.thumb.alt} />
                                    </div>
                                ))}
                            </div>

                            {imagenes.length > 1 && (
                                <>
                                    <button className="control control-prev" type="button" onClick={anteriorSlide} aria-label="Imagen anterior">
                                        <RightArrowIcon width={18} height={18} />
                                    </button>
                                    <button className="control control-next" type="button" onClick={siguienteSlide} aria-label="Imagen siguiente">
                                        <RightArrowIcon width={18} height={18} />
                                    </button>

                                    <div className="indicadores" aria-label="Selector de imágenes">
                                        {imagenes.map((_, index) => (
                                            <button
                                                key={`indicador-${index}`}
                                                type="button"
                                                className={`indicador${index === slideActual ? ' active' : ''}`}
                                                onClick={() => irASlide(index)}
                                                aria-label={`Ir a la imagen ${index + 1}`}
                                                aria-current={index === slideActual}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="info">
                        <div className="head">
                            <h3 className="titulo" id="modal-title">{trabajo.info.nombre}</h3>
                            <span className="categoria">{trabajo.info.categoria}</span>
                        </div>
                        <div className="body">
                            {/* Contenido descriptivo del trabajo seleccionado. */}
                            {trabajo.info.contenido}

                            {/* Llamadas a la accion del proyecto con el mismo estilo global de la web. */}
                            <div className="acciones">
                                {!esAppMovil && demoUrl && (
                                    <a href={demoUrl} className="boton transparente" target="_blank" rel="noreferrer">
                                        {trabajo.demoLabel || 'Ver Demo'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                                        </svg>
                                    </a>
                                )}
                                {githubUrl && (
                                    <a href={githubUrl} className="boton" target="_blank" rel="noreferrer">
                                        Git
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
