import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkModeSwitch from "../DarkModeSwitch";
import "./CVPage.css";

// Vista dedicada del CV con tema independiente y exportacion a PDF.
const CVPage = () => {
    // Tema exclusivo de la vista CV (no depende del dark mode de la pagina principal).
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("cv-theme") || "dark";
    });

    // Estado para bloquear el boton mientras se genera el PDF.
    const [isGenerating, setIsGenerating] = useState(false);

    // Persiste la preferencia de tema en localStorage.
    useEffect(() => {
        localStorage.setItem("cv-theme", theme);
    }, [theme]);

    // Genera y descarga el CV en PDF usando import dinamico para no cargar la libreria al inicio.
    const downloadPDF = async () => {
        const page = document.getElementById("cv-page");
        if (!page) {
            return;
        }

        const bgColor = theme === "light" ? "#ffffff" : "#161c26";
        setIsGenerating(true);

        try {
            const { default: html2pdf } = await import("html2pdf.js");

            await html2pdf()
                .set({
                    margin: 0,
                    filename: "Angel_Rivera_CV.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, backgroundColor: bgColor },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                })
                .from(page)
                .save();
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="cv-view" data-theme={theme}>
            {/* Barra superior: marca, switch de tema y acciones */}
            <div className="toolbar">
                <a
                    className="toolbar-brand"
                    href="https://rrad.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="brand-dot">RR</div>
                    <span className="brand-text">
                        rrad.dev <span>↗</span>
                    </span>
                </a>

                <div className="toolbar-actions">
                    {/* Switch reutilizado desde el componente global */}
                    <DarkModeSwitch
                        className="cv-dark-mode"
                        name="cv-dark-mode"
                        id="cv-dark-mode"
                        checked={theme === "dark"}
                        onChange={(isDark) => setTheme(isDark ? "dark" : "light")}
                        useBodyClass={false}
                    />

                    <Link className="btn btn-outline" to="/">
                        Volver
                    </Link>

                    {/* Boton de descarga con estado de carga */}
                    <button
                        className={`btn btn-primary ${isGenerating ? "btn-loading" : ""}`}
                        id="downloadBtn"
                        onClick={downloadPDF}
                        type="button"
                    >
                        {isGenerating ? "Generando..." : "Download PDF"}
                    </button>
                </div>
            </div>

            {/* Tarjeta principal del CV */}
            <div id="cv-page">
                <header className="cv-header">
                    <div className="header-inner">
                        <div>
                            <h1 className="header-name">
                                Angel Danilo
                                <br />
                                Rivera Rojas
                            </h1>
                            <p className="header-sub">Computer Systems Engineer</p>
                            <p className="header-location">Ocotlan, Jalisco, Mexico</p>
                        </div>

                        <div className="header-contacts">
                            <a className="contact-item" href="mailto:proxzteam@gmail.com">
                                proxzteam@gmail.com
                            </a>
                            <a className="contact-item" href="tel:3921064092">
                                392 106 4092
                            </a>
                            <a
                                className="contact-item"
                                href="https://www.linkedin.com/in/angel-danilo-rivera-rojas-820014357/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn Profile
                            </a>
                            <a className="contact-item" href="https://rrad.dev" target="_blank" rel="noopener noreferrer">
                                rrad.dev
                            </a>
                        </div>
                    </div>
                </header>

                <div className="cv-body">
                    {/* Columna principal del contenido profesional */}
                    <main className="cv-main">
                        <section className="section">
                            <div className="section-label">Profile</div>
                            <p className="summary-text">
                                Computer Systems Engineering student with strong focus on frontend development and mobile
                                applications. Experienced in building full-stack projects using technologies like React, Node.js,
                                and Android (Kotlin). Passionate about creating user-centered solutions, improving performance, and
                                continuously learning new technologies.
                            </p>
                        </section>

                        <section className="section">
                            <div className="section-label">Experience</div>

                            <div className="exp-item">
                                <div className="exp-role">Waiter - Service Team</div>
                                <div className="exp-meta">
                                    <span className="exp-company">Grupo de Meseros Excelencia</span>
                                    <span className="exp-date">2025 - Present</span>
                                </div>
                                <p className="exp-desc">
                                    Customer-facing service role developing strong interpersonal communication, teamwork, and
                                    problem-solving skills in a fast-paced environment.
                                </p>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Bootcamp Participant</div>
                                <div className="exp-meta">
                                    <span className="exp-company">Hewlett Packard Enterprise</span>
                                    <span className="exp-date">Academic Program</span>
                                </div>
                                <p className="exp-desc">
                                    Participated in an intensive bootcamp by HPE, gaining hands-on experience with enterprise
                                    software practices, agile methodologies, and technology solutions.
                                </p>
                                <div className="exp-tags">
                                    <span className="exp-tag">HPE</span>
                                    <span className="exp-tag">Agile</span>
                                    <span className="exp-tag">Enterprise</span>
                                </div>
                            </div>

                            <div className="exp-item">
                                <div className="exp-role">Team Leader - AWS Workshop</div>
                                <div className="exp-meta">
                                    <span className="exp-company">AWS Cloud Club - TecNM Ocotlan (CardenalITOS)</span>
                                    <span className="exp-date">Workshop</span>
                                </div>
                                <p className="exp-desc">
                                    Led a team in the Build Games in Minutes using Python and Amazon Q Developer workshop,
                                    coordinating tasks and driving collaborative solutions.
                                </p>
                                <div className="exp-tags">
                                    <span className="exp-tag">AWS</span>
                                    <span className="exp-tag">Python</span>
                                    <span className="exp-tag">Amazon Q</span>
                                    <span className="exp-tag">Team Lead</span>
                                </div>
                            </div>
                        </section>

                        <section className="section">
                            <div className="section-label">Certifications</div>
                            <div className="cert-item">
                                <span className="cert-num">01</span>
                                <div>
                                    <div className="cert-name">Pensamiento estrategico y mentalidad estrategica</div>
                                    <div className="cert-issuer">Santander Open Academy</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">02</span>
                                <div>
                                    <div className="cert-name">Fundamentals of Machine Learning and Artificial Intelligence</div>
                                    <div className="cert-issuer">AWS Training & Certification</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">03</span>
                                <div>
                                    <div className="cert-name">AWS Cloud Foundations for Professionals - Cloud Practitioner Essentials</div>
                                    <div className="cert-issuer">AWS Training & Certification</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">04</span>
                                <div>
                                    <div className="cert-name">Conceptos basicos de redes</div>
                                    <div className="cert-issuer">CISCO Networking Academy</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">05</span>
                                <div>
                                    <div className="cert-name">Python Essentials 1
                                    </div>
                                    <div className="cert-issuer">CISCO Networking Academy</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">06</span>
                                <div>
                                    <div className="cert-name">Python Essentials 2</div>
                                    <div className="cert-issuer">CISCO Networking Academy</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">07</span>
                                <div>
                                    <div className="cert-name">Official Scrum Fundamentals Certification
                                    </div>
                                    <div className="cert-issuer">AIBES</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">08</span>
                                <div>
                                    <div className="cert-name">Python 101 for Data Science
                                    </div>
                                    <div className="cert-issuer">IBM</div>
                                </div>
                            </div>
                            <div className="cert-item">
                                <span className="cert-num">09</span>
                                <div>
                                    <div className="cert-name">Introduction to Cloud

                                    </div>
                                    <div className="cert-issuer">IBM</div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Barra lateral con resumen de perfil */}
                    <aside className="cv-aside">
                        <div className="aside-section">
                            <div className="aside-label">Education</div>
                            <div className="edu-degree">B.Eng. Computer Systems Engineering</div>
                            <div className="edu-school">Instituto Tecnologico de Ocotlan</div>
                            <div className="edu-year">Expected 2027</div>
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">Technical Skills</div>
                            <span className="skill-chip">React</span>
                            <span className="skill-chip">Node.js</span>
                            <span className="skill-chip">TypeScript</span>
                            <span className="skill-chip">JavaScript</span>
                            <span className="skill-chip">Python</span>
                            <span className="skill-chip">Kotlin</span>
                            <span className="skill-chip">Android</span>
                            <span className="skill-chip">HTML / CSS</span>
                            <span className="skill-chip">AWS</span>
                            <span className="skill-chip">Git</span>
                            <span className="skill-chip">REST APIs</span>
                            <span className="skill-chip">Scrum</span>
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">Soft Skills</div>
                            <span className="skill-chip">Communication</span>
                            <span className="skill-chip">Team Leadership</span>
                            <span className="skill-chip">Approachable</span>
                            <span className="skill-chip">Fast Learner</span>
                            <span className="skill-chip">Problem Solving</span>
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">Languages</div>
                            <div className="lang-row">
                                <span className="lang-name">Spanish</span>
                                <span className="lang-level">Native</span>
                            </div>
                            <div className="lang-row">
                                <span className="lang-name">English</span>
                                <span className="lang-level">B2</span>
                            </div>
                        </div>

                        <div className="aside-section">
                            <div className="aside-label">Interests</div>
                            <span className="skill-chip">Frontend Dev</span>
                            <span className="skill-chip">Mobile Apps</span>
                            <span className="skill-chip">Machine Learning</span>
                            <span className="skill-chip">Cloud Computing</span>
                            <span className="skill-chip">UI / UX</span>
                        </div>
                    </aside>
                </div>

                {/* Pie del CV */}
                <footer className="cv-footer">
                    <span className="footer-note">Angel Danilo Rivera Rojas - 2025</span>
                    <a className="footer-link" href="https://rrad.dev" target="_blank" rel="noopener noreferrer">
                        rrad.dev
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default CVPage;