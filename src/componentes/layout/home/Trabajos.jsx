import './Trabajos.css'
import { useState } from 'react';
import trabajos from './data/trabajos';
import Modal from './Modal';
import { getHomeTexts } from './data/homeTexts';
import { ArrowCircleIcon } from './icons/SVGIcons';

// Seccion de portafolio con filtro por categoria y modal de detalle.
const Trabajos = ({ language = 'en' }) => {
    const labels = getHomeTexts(language).trabajos;

    // Configuracion de los filtros. Si agregas otra categoria, solo extiende esta lista.
    const filtros = [
        { id: 'todos', label: labels.all },
        { id: 'desarrollo-web', label: labels.webDesign },
        { id: 'aplicaciones-moviles', label: labels.mobile },
    ];

    // Categoria activa del filtro.
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
    // Controla si el modal esta abierto.
    const [estadosModal, setEstadoModal] = useState(false);
    // Guarda el proyecto que se muestra en el modal.
    const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(trabajos[0])

    // La lista visible se calcula a partir de la categoria; asi evitamos duplicar estado.
    const trabajosFiltrados = categoriaSeleccionada === 'todos'
        ? trabajos
        : trabajos.filter((trabajo) => trabajo.categoria === categoriaSeleccionada);

    // Cambia la categoria y recalcula los trabajos a mostrar.
    const handleChange = (categoria) => {
        setCategoriaSeleccionada(categoria);
    };

    // Abre el modal y busca el trabajo correspondiente al id seleccionado.
    const openModal = (e, id) => {
        e.preventDefault();
        setEstadoModal(true);

        // find ya devuelve el primer elemento coincidente, sin necesidad de if/return.
        const trabajo = trabajos.find((trabajo) => trabajo.id === id);

        setTrabajoSeleccionado(trabajo);
    };

    // Cierra el modal de detalle.
    const closeModal = () => {
        setEstadoModal(false);
    };

    // Tarjeta reutilizable para cada proyecto del grid.
    const renderTrabajo = (trabajo) => {
        return (
            <div className="trabajo" key={trabajo.id}>
                <a href="#" className="thumb" onClick={(e) => openModal(e, trabajo.id)}>
                    <img loading="lazy" src={trabajo.thumb.url} alt={trabajo.thumb.alt} />
                </a>

                <div className="info">
                    <div className="textos">
                        <a href="#" className="nombre" onClick={(e) => openModal(e, trabajo.id)}>
                            {trabajo.info.nombre}
                        </a>
                        
                    </div>
                    <a href="#" className="btn-ir" onClick={(e) => openModal(e, trabajo.id)}>
                        <ArrowCircleIcon width={16} height={16} />
                    </a>
                </div>
            </div>
        );
    };

    return (
        <section className="trabajos" id="trabajos">
            <div className="encabezado">
                <h3 className="titulo">{labels.title}</h3>
                <p className="subtitulo">{labels.subtitle}</p>
            </div>

            <div className="filtros">
                {/* Los radios salen de una sola lista para que agregar filtros sea mas rapido. */}
                {filtros.map((filtro) => (
                    <label htmlFor={filtro.id} key={filtro.id}>
                        <input
                            type="radio"
                            name="categoria"
                            id={filtro.id}
                            onChange={() => handleChange(filtro.id)}
                            checked={categoriaSeleccionada === filtro.id}
                        />
                        <span className="opcion">{filtro.label}</span>
                    </label>
                ))}
            </div>

            {/* Grid de tarjetas segun el filtro activo. */}
            <div className="grid">
                {trabajosFiltrados.map(renderTrabajo)}
            </div>

            {/* Render condicional del modal cuando hay un trabajo abierto. */}
            {estadosModal && <Modal key={trabajoSeleccionado.id} closeModal={closeModal} trabajo={trabajoSeleccionado} />}
        </section>
    );
};

export default Trabajos;
