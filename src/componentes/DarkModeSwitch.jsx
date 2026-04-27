import "./DarkModeSwitch.css";
import { useState, useEffect } from "react";

/**
 * Switch de tema claro/oscuro. Persiste la preferencia en localStorage.
 * @param {Object} props - Opciones de configuración
 * @param {string} props.name - Nombre del input
 * @param {string} props.id - ID del input
 * @param {string} props.className - Clases adicionales
 * @param {string} props.persistKey - Clave de localStorage (default: "dark-mode")
 * @param {boolean} props.useBodyClass - Aplicar clase "dark" en body (default: true)
 */
const DarkModeSwitch = ({
    name = "dark-mode",
    id = "dark-mode",
    className = "",
    persistKey = "dark-mode",
    useBodyClass = true,
    checked,
    onChange,
}) => {
    const isControlled = typeof checked === "boolean";

    // Toma el tema guardado en localStorage para mantener preferencia entre recargas.
    const estadoInicial = JSON.parse(localStorage.getItem(persistKey) || false);
    // Estado que controla si el sitio está en modo oscuro o claro.
    const [darkMode, setDarkMode] = useState(estadoInicial);

    const currentDarkMode = isControlled ? checked : darkMode;

    // Alterna el estado y lo persiste en localStorage.
    const toggleDarkMode = () => {
        const nextValue = !currentDarkMode;

        if (!isControlled) {
            setDarkMode(nextValue);
        }

        localStorage.setItem(persistKey, JSON.stringify(nextValue));

        if (onChange) {
            onChange(nextValue);
        }
    };

    useEffect(() => {
        if (!isControlled) return;

        localStorage.setItem(persistKey, JSON.stringify(checked));
    }, [checked, isControlled, persistKey]);

    // Aplica o remueve la clase "dark" en <body> para activar estilos globales de tema.
    useEffect(() => {
        if (!useBodyClass) return;

        if (currentDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [currentDarkMode, useBodyClass]);

    return (
        <label className={`dark-mode ${className}`.trim()}>
            {/* Switch visual del tema: input oculto + iconos de sol y luna */}
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={currentDarkMode}
                onChange={toggleDarkMode}
            />
            <span className={`icono sol ${!currentDarkMode ? "active" : ""}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                    </svg>
                </span>

                <span className={`icono luna ${currentDarkMode ? "active" : ""}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
                </span>
            </label>
    );
};

export default DarkModeSwitch;
