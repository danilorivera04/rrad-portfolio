import './Contacto.css'

// Seccion de contacto simplificada con CTA directo a WhatsApp.
const Contacto = () => {
    const whatsappUrl = 'https://wa.me/523921064092?text=Hola%20Danilo%2C%20quiero%20hablar%20sobre%20mi%20proyecto';

    return (
        <>
            <section className="contacto" id="contacto">
                <div className="contacto-contenido">
                    <div className="encabezado contacto-encabezado">
                        <h3 className="titulo">Hagamos tu idea realidad</h3>
                        <p className="subtitulo">Escribeme directamente por WhatsApp y te respondo lo antes posible.</p>
                    </div>

                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="boton contacto-whatsapp">
                        <div className="icono" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 8.028 0C3.594 0 0 3.594 0 8.029c0 1.416.37 2.799 1.072 4.018L0 16l4.06-1.059a8 8 0 0 0 3.968 1.013h.004c4.434 0 8.028-3.594 8.028-8.028a7.97 7.97 0 0 0-2.459-5.6m-5.57 12.28h-.003a6.64 6.64 0 0 1-3.38-.924l-.242-.144-2.409.629.643-2.35-.157-.242a6.63 6.63 0 0 1-1.015-3.546c0-3.66 2.978-6.638 6.64-6.638 1.77 0 3.433.688 4.684 1.938a6.58 6.58 0 0 1 1.95 4.69c-.002 3.66-2.98 6.637-6.641 6.637m3.64-4.96c-.2-.1-1.183-.583-1.367-.649-.184-.067-.318-.1-.452.1-.134.2-.518.649-.635.783-.117.134-.234.15-.434.05-.2-.1-.843-.31-1.605-.988-.592-.528-.993-1.18-1.11-1.38-.117-.2-.012-.308.088-.408.09-.09.2-.234.3-.351.1-.117.134-.2.2-.334.067-.134.033-.251-.017-.351-.05-.1-.451-1.084-.618-1.484-.163-.391-.329-.338-.451-.344l-.384-.007c-.134 0-.351.05-.535.251-.184.2-.702.686-.702 1.67s.719 1.934.819 2.067c.1.134 1.414 2.16 3.425 3.028.478.206.85.329 1.14.421.479.152.915.131 1.259.08.384-.057 1.183-.484 1.35-.951.167-.467.167-.868.117-.951-.05-.084-.184-.134-.384-.234" />
                            </svg>
                        </div>
                        <span>Hablar por WhatsApp</span>
                        <div className="icono" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.75.75 0 0 1 .75-.75h10.69L9.22 4.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H1.75A.75.75 0 0 1 1 8" />
                            </svg>
                        </div>
                    </a>
                </div>
            </section>
        </>
    );
};

export default Contacto;
