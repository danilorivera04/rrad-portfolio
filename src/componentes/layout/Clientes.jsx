import "./Clientes.css"

const Clientes = () => {

    return (
        <>
            <section className="clientes">
                <div className="encabezado">
                    <h3 className="titulo">Mis Clientes</h3>
                    <p className="subtitulo">Estas marcas han confiado en mis servicios como freelance</p>
                </div>

                <div className="logos">
                    <img src="./assets/logos/Recharge.svg" alt="Logo de Recharge" className="logo" />
                    <img src="./assets/logos/Volume.svg" alt="Logo de Volumne" className="logo" />
                    <img src="./assets/logos/Umbrella.svg" alt="Logo de Umbrella" className="logo" />
                    <img src="./assets/logos/Waveless.svg" alt="Logo de Waveless" className="logo" />
                    <img src="./assets/logos/Vision.svg" alt="Logo de Vision" className="logo" />


                </div>

            </section>
        </>);

}

export default Clientes;