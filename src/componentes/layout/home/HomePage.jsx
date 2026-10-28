import { useEffect, useRef, useState } from "react";
import useScrollReveal from "./useScrollReveal";
import "./Motion.css";
import Header from "./Header";
import Hero from "./Hero";
import Trabajos from "./Trabajos";
import AcercaDe from "./AcercaDe";
import Contacto from "./Contacto";
import Footer from "./Footer";

const HomePage = () => {
    const pageRef = useRef(null);
    useScrollReveal(pageRef);
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("cv-language");
        if (savedLanguage) return savedLanguage;
        return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
    });
    useEffect(() => {
        localStorage.setItem("cv-language", language);
    }, [language]);
    return (
        <div className="home-shell home-motion" ref={pageRef} id="inicio">
            <Header language={language} onLanguageChange={setLanguage} />
            <main className="contenedor home-content">
                <Hero language={language} />
                <Trabajos language={language} />
                <AcercaDe language={language} />
                <Contacto language={language} />
                <Footer language={language} />
            </main>
        </div>
    );
};
export default HomePage;
