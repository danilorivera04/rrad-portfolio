import './AcercaDe.css';

// Seccion de perfil profesional y propuesta de valor.
const AcercaDe = ({ language = 'en' }) => {
    const t = {
        pretitle: language === 'es' ? 'Acerca de mí' : 'About me',
        title: language === 'es' ? 'La razón por la que deberías contratarme...' : 'Why you should hire me...',
        summary: language === 'es'
            ? 'Soy Ángel Danilo Rivera Rojas, estudiante de Ingeniería en Sistemas Computacionales y desarrollador apasionado por la tecnología, el diseño y la creación de soluciones digitales con impacto real.'
            : 'I am Angel Danilo Rivera Rojas, a Computer Systems Engineering student and developer passionate about technology, design, and creating digital solutions with real impact.',
        summary2: language === 'es'
            ? 'Me especializo en el desarrollo de aplicaciones web y móviles, combinando lógica, estructura y una fuerte atención al detalle en la experiencia de usuario. Me motiva construir proyectos que no solo funcionen bien, sino que también se vean profesionales y transmitan identidad.'
            : 'I specialize in web and mobile application development, combining logic, structure, and strong attention to detail in user experience. I am motivated to build projects that not only work well, but also look professional and convey identity.',
        cta: language === 'es' ? 'Mandame un mensaje' : 'Send me a message',
    };

    return (
        <>
            <section className="acerca-de" id="acerca-de">
                <div className="grid">
                    <div className="col-1">
                        {/* Composicion de fotos personales */}
                        <div className="fotos">
                            <img src="./assets/yo.png" className="foto" alt="" />
                            <img src="./assets/trabajos//14.png" className="foto" alt="" />

                        </div>
                    </div>
                    <div className="col-2">
                        {/* Texto descriptivo + CTA para contacto */}
                        <h4 className="pre-titulo">{t.pretitle}</h4>
                        <h3 className="titulo">{t.title}</h3>
                        <p className="resumen">{t.summary}
                            <br />
                            {t.summary2}
                            <br />
                        </p>
                        <a href="#contacto" className="boton">
                            {t.cta}
                            <span className="icono">


                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                            </span>
                        </a>
                    </div>

                </div>
            </section>

        </>
    )

};

export default AcercaDe;
