// Composicion de la pagina principal.
// Este archivo solo agrupa secciones para que la landing quede mas ordenada y facil de leer.
import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Clientes from "./Clientes";
import Trabajos from "./Trabajos";
import AcercaDe from "./AcercaDe";
import Contacto from "./Contacto";
import Footer from "./Footer";

const HomePage = () => {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem("cv-language");
        if (savedLanguage) return savedLanguage;

        return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
    });

    useEffect(() => {
        localStorage.setItem("cv-language", language);
    }, [language]);

    return (
        <div className="contenedor">
            <Header language={language} onLanguageChange={setLanguage} />
            <Hero language={language} />
            <Clientes language={language} />
            <Trabajos language={language} />
            <AcercaDe language={language} />
            <Contacto language={language} />
            <Footer language={language} />
        </div>
    );
};

export default HomePage;
