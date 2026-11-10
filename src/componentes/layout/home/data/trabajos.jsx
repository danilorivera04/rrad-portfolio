// Fuente de datos local para la seccion de trabajos/portafolio.
// Cada proyecto define su propia galeria y su propio texto para evitar contenido compartido.

const crearContenidoTexto = (...parrafos) =>
	crearContenido(parrafos.map((parrafo) => ({
		tipo: 'texto',
		valor: parrafo,
	})));

const crearGaleria = (...imagenes) =>
	imagenes.map((imagen, index) => ({
		url: imagen,
		alt: `Vista ${index + 1}`,
	}));

// Construye el contenido del modal a partir de bloques simples.
// Asi cada proyecto solo define que parrafos e imagenes necesita.
const crearContenido = (bloques) => (
	<>
		{bloques.map((bloque, index) => {
			if (bloque.tipo === 'texto') {
				return <p key={`texto-${index}`}>{bloque.valor}</p>;
			}

			if (bloque.tipo === 'imagen') {
				return <img key={`imagen-${index}`} loading="lazy" src={bloque.src} alt={bloque.alt || ''} />;
			}

			return null;
		})}
	</>
);

const trabajoAsset = (fileName) => `/assets/imagenes/trabajos/${fileName}`;

const contenidoStartup = crearContenidoTexto(
	'Startup Page es una landing page conceptual desarrollada para demostrar habilidades en diseño UI/UX y desarrollo frontend.',
	'El proyecto se enfoca en una estructura clara y jerárquica que guía al usuario a través de una experiencia intuitiva, destacando la propuesta de valor, las características principales y los llamados a la acción.',
	'Incluye diseño responsive, soporte para modo claro y oscuro, soporte para cambiar entre los idiomas de ingles/español y una interfaz moderna orientada a rendimiento y facilidad de uso.'
);

const contenidoFitPlanner = crearContenidoTexto(
	'Startup Page es una landing page conceptual desarrollada para demostrar habilidades en diseño UI/UX y desarrollo frontend.',
	'El proyecto se enfoca en una estructura clara y jerárquica que guía al usuario a través de una experiencia intuitiva, destacando la propuesta de valor, las características principales y los llamados a la acción.',
	'Incluye diseño responsive, soporte para modo claro y oscuro, soporte para cambiar entre los idiomas de ingles/español y una interfaz moderna orientada a rendimiento y facilidad de uso.'
);

const contenidoQuinielasEntreCuates = crearContenidoTexto(
	'Pronósticos entre Cuates es una plataforma para organizar quinielas de fútbol, desarrollada para digitalizar el registro de participantes, la captura de pronósticos y el seguimiento de resultados desde una experiencia clara y accesible.',
	'La aplicación permite seleccionar resultados, elegir modalidades con distintos límites de dobles, generar automáticamente todas las combinaciones y registrar las jugadas con un folio único. Los participantes pueden consultar sus quinielas, revisar tablas de posiciones y visualizar sus aciertos conforme se actualizan los marcadores.',
	'Incluye un panel administrativo protegido para gestionar torneos, jornadas, partidos, registros, pagos y premios. También incorpora importación de encuentros de Liga MX, exportación de reportes en PDF y CSV, envío mediante WhatsApp y publicación programada de jornadas.',
	'El proyecto fue desarrollado con React, TypeScript, Vite y Supabase, utilizando autenticación por roles, PostgreSQL, funciones transaccionales y políticas de seguridad a nivel de base de datos. Su interfaz responsive está optimizada para computadoras y dispositivos móviles.'

);

// Cada objeto representa una tarjeta del grid y su contenido detallado en el modal.
const trabajos = [
	{
		id: 1,
		categoria: 'desarrollo-web',
		thumb: {
			url: trabajoAsset('startup-website/1.png'),
			alt: 'Trabajo 1',
		},
		galeria: crearGaleria(
			trabajoAsset('startup-website/1.png'),
			trabajoAsset('startup-website/2.png'),
			trabajoAsset('startup-website/3.png'),
			trabajoAsset('startup-website/4.png'),
		),
		info: {
			nombre: 'Startup Page',
			categoria: 'Desarrollo Web',
			contenido: contenidoStartup,
		},
		demoUrl: 'https://startup-page-plum.vercel.app/',
		githubUrl: 'https://github.com/danilorivera04/startup-page',
	},
	{
		id: 2,
		categoria: 'aplicaciones-moviles',
		thumb: {
			url: trabajoAsset('fitplanner-app/1.png'),
			alt: 'Trabajo 2',
		},
		galeria: crearGaleria(
			trabajoAsset('fitplanner-app/1.png'),
			trabajoAsset('fitplanner-app/2.png'),
			trabajoAsset('fitplanner-app/3.png'),
			trabajoAsset('fitplanner-app/4.png'),
			trabajoAsset('fitplanner-app/5.png'),
			trabajoAsset('fitplanner-app/7.png'),

		),
		formatoGaleria: 'vertical',
		info: {
			nombre: 'FitPlanner App',
			categoria: 'Aplicaciones Móviles',
			contenido: contenidoFitPlanner,
		},
		githubUrl: 'https://github.com/danilorivera04/fitplanner-app',
	},
	{
		id: 3,
		categoria: 'desarrollo-web',
		thumb: {
			url: trabajoAsset('pronosticos-entre-cuates/6.png'),
			alt: 'Trabajo 3',
		},
		galeria: crearGaleria(
			trabajoAsset('pronosticos-entre-cuates/1.png'),
			trabajoAsset('pronosticos-entre-cuates/2.png'),
			trabajoAsset('pronosticos-entre-cuates/3.png'),
			trabajoAsset('pronosticos-entre-cuates/4.png'),
			trabajoAsset('pronosticos-entre-cuates/5.png'),
			

		),
		formatoGaleria: 'vertical',
		info: {
			nombre: 'Quinielas Entre Cuates',
			categoria: 'Desarrollo Web',
			contenido: contenidoQuinielasEntreCuates,
		},
		demoUrl: 'https://www.pronosticosentrecuates.com/',
		demoLabel: 'Ver pagina',
	},
	{
		id: 4,
		categoria: 'desarrollo-web',
		thumb: {
			url: trabajoAsset('riviera-del-sol/1.webp'),
			alt: 'Portada de Riviera del Sol con una vista del acceso residencial',
		},
		galeria: [
			'Portada y acceso principal de Riviera del Sol',
			'Vista aérea y características del desarrollo',
			'Condiciones de preventa y mensualidades',
			'Información de la rifa de terrenos',
			'Mapa de ubicación en Aguascalientes',
			'Contacto de ventas para México y Estados Unidos',
		].map((alt, index) => ({
			url: trabajoAsset(`riviera-del-sol/${index + 1}.webp`),
			alt,
		})),
		info: {
			nombre: 'Riviera del Sol',
			categoria: 'Desarrollo Web',
			contenido: crearContenidoTexto(
				'Riviera del Sol es un sitio web bilingüe que presenta un proyecto residencial privado en Aguascalientes. A través de vistas aéreas, un plano conceptual y un mapa de ubicación, los visitantes pueden conocer el entorno y explorar la distribución propuesta de los terrenos.',
				'El sitio detalla las condiciones de preventa, desde el enganche hasta las mensualidades, y explica cómo participar en la rifa de los primeros seis lotes. También incorpora una guía de voz en español e inglés que acompaña el recorrido por cada sección.',
				'El proyecto se desarrolló con React, TypeScript, Vite y Tailwind CSS. Su diseño se adapta a computadoras y dispositivos móviles.',
			),
		},
		demoUrl: 'https://riviera-del-sol.vercel.app/',
		demoLabel: 'Ver página',
	},
];

export default trabajos;
