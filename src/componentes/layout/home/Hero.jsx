import "./Hero.css";
import { getHomeTexts } from "./data/homeTexts";
import { SendIcon, WhatsAppIcon } from "./icons/SVGIcons";

const Hero = ({ language = "en" }) => {
    const t = getHomeTexts(language).hero;
    return (
        <section className="hero">
            <div className="contenido">
                <p className="hero-eyebrow">{t.role}</p>
                <h1 className="titulo"><span>{t.greeting}</span>{t.intro}</h1>
                <p className="subtitulo">{t.description}</p>
                <div className="botones">
                    <a href="#trabajos" className="boton transparente">
                        {t.viewWorks}<div className="icono"><SendIcon width={16} height={16} /></div>
                    </a>
                    <a href="#contacto" className="boton">
                        {language === 'es' ? 'Hablemos' : 'Let’s talk'}<div className="icono"><WhatsAppIcon width={16} height={16} /></div>
                    </a>
                </div>
            </div>
            <div className="video-container">
                <video src="/assets/video_fondo.mp4" loop autoPlay muted playsInline aria-hidden="true" className="video" type="video/mp4"></video>
            </div>
        </section>
    );
};
export default Hero;
