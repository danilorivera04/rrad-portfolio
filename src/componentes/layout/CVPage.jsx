import { useEffect, useState } from "react";
import CVToolbar from "./cv/CVToolbar";
import CVHeader from "./cv/CVHeader";
import { exportCV } from "./cv/exportCV";
import {
    CVChipList,
    CVCertificationItem,
    CVExperienceItem,
    CVLanguageRow,
    CVSection,
    CVProjectItem,
} from "./cv/CVSections";
import { getTranslation } from "../data/cv.translations";
import "./CVPage.css";

// Vista dedicada del CV con tema independiente y exportacion a PDF.
const CVPage = () => {
    // Arranca con el mismo booleano de tema que usa la pagina principal.
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("dark-mode") || "false");
    });

    // Estado para el idioma del CV
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("cv-language");
        if (savedLanguage) return savedLanguage;

        return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
    });

    // Estado para bloquear el boton mientras se genera el PDF.
    const [isGenerating, setIsGenerating] = useState(false);
    const [exportError, setExportError] = useState("");

    // Obtener traducciones según el idioma seleccionado
    const translation = getTranslation(language);
    const {
        cvHeader,
        personalData,
        contactLinks,
        profileSummary,
        experiences,
        certifications,
        projects,
        education,
        technicalSkills,
        softSkills,
        languages,
        interests,
        sections,
        personalDataLabel,
    } = translation;

    // Persiste la preferencia de tema en el mismo key compartido por el home.
    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Persiste la preferencia de idioma
    useEffect(() => {
        localStorage.setItem("cv-language", language);
    }, [language]);

    // Genera y descarga el CV en PDF usando import dinamico.
    const downloadPDF = async () => {
        const exportRoot = document.getElementById("cv-export-root");
        if (!exportRoot || isGenerating) return;

        setIsGenerating(true);
        setExportError("");

        try {
            const filename = language === "es" ? "Angel_Rivera_CV_ES.pdf" : "Angel_Rivera_CV_EN.pdf";
            await exportCV(exportRoot, filename);

        } catch (error) {
            console.error("Error al generar el PDF:", error);
            setExportError(language === "es"
                ? "No se pudo generar el PDF. Inténtalo de nuevo."
                : "The PDF could not be generated. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        // Este root incluye el estado visual del tema y es el origen real del PDF.
        <div
            id="cv-export-root"
            className="cv-view"
            data-theme={isDarkMode ? "dark" : "light"}
        >
            <CVToolbar
                isDarkMode={isDarkMode}
                isGenerating={isGenerating}
                onToggleDarkMode={setIsDarkMode}
                onDownloadPDF={downloadPDF}
                language={language}
                onLanguageChange={setLanguage}
            />

            {exportError && <p role="alert">{exportError}</p>}

            <div id="cv-page">
                <CVHeader
                    header={cvHeader}
                    personalData={personalData}
                    contactLinks={contactLinks}
                    personalDataLabel={personalDataLabel}
                />

                <div className="cv-body">
                    <main className="cv-main">
                        <CVSection label={sections.profile}>
                            <p className="summary-text">{profileSummary}</p>
                        </CVSection>

                        <CVSection label={sections.experience}>
                            {experiences.map((experience) => (
                                <CVExperienceItem
                                    key={`${experience.role}-${experience.company}`}
                                    {...experience}
                                />
                            ))}
                        </CVSection>

                        <CVSection label={sections.certifications}>
                            {certifications.map((certification) => (
                                <CVCertificationItem
                                    key={certification.number}
                                    {...certification}
                                />
                            ))}
                        </CVSection>

                        <CVSection label={sections.projects}>
                            {projects.map((project) => (
                                <CVProjectItem
                                    key={project.number}
                                    {...project}
                                />
                            ))}
                        </CVSection>
                    </main>

                    <aside className="cv-aside">
                        <div className="aside-section">
                            <div className="aside-label">{sections.education}</div>
                            <div className="edu-degree">{education.degree}</div>
                            <div className="edu-school">{education.school}</div>
                            <div className="edu-year">{education.year}</div>
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">{sections.technicalSkills}</div>
                            <CVChipList items={technicalSkills} className="chips-wrap" />
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">{sections.softSkills}</div>
                            <CVChipList items={softSkills} className="chips-wrap" />
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">{sections.languages}</div>
                            {languages.map((lang) => (
                                <CVLanguageRow key={lang.name} {...lang} />
                            ))}
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">{sections.interests}</div>
                            <CVChipList items={interests} className="chips-wrap" />
                        </div>
                    </aside>
                </div>

                <footer className="cv-footer">
                    <span className="footer-note">Angel Danilo Rivera Rojas - 2026</span>
                    <a
                        className="footer-link"
                        href="https://rrad.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        rrad.dev
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default CVPage;
