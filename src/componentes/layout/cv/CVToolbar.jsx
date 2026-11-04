import { Link } from "react-router-dom";
import DarkModeSwitch from "../../DarkModeSwitch";
import "./CVToolbar.css";

// Barra superior del CV: mantiene acciones separadas del contenido exportable.
const CVToolbar = ({ isDarkMode, isGenerating, onToggleDarkMode, onDownloadPDF, language = "en", onLanguageChange }) => {
    return (
        <div className="toolbar">
            <a
                className="toolbar-brand"
                href="https://rrad.dev"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="brand-dot" src="/assets/imagenes/logo.png" alt="RRAD" width="32" height="32" />
                <span className="brand-text">
                    rrad.dev <span>↗</span>
                </span>
            </a>

            <div className="toolbar-actions">
                <DarkModeSwitch
                    className="cv-dark-mode"
                    name="cv-dark-mode"
                    id="cv-dark-mode"
                    checked={isDarkMode}
                    onChange={onToggleDarkMode}
                    useBodyClass={false}
                />

                <div className="language-selector">
                    <button
                        className={`language-btn ${language === "en" ? "active" : ""}`}
                        onClick={() => onLanguageChange?.("en")}
                        title="English"
                    >
                        EN
                    </button>
                    <button
                        className={`language-btn ${language === "es" ? "active" : ""}`}
                        onClick={() => onLanguageChange?.("es")}
                        title="Español"
                    >
                        ES
                    </button>
                </div>

                <Link className="btn btn-outline" to="/">
                    Volver
                </Link>

                <button
                    className={`btn btn-primary ${isGenerating ? "btn-loading" : ""}`}
                    id="downloadBtn"
                    onClick={onDownloadPDF}
                    type="button"
                    disabled={isGenerating}
                >
                    {isGenerating ? (language === "es" ? "Generando..." : "Generating...") : (language === "es" ? "Descargar PDF" : "Download PDF")}
                </button>
            </div>
        </div>
    );
};

export default CVToolbar;
