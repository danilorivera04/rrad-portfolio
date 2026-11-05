// Archivo de traducciones para el CV - Inglés y Español
// Este archivo contiene todos los datos del CV en ambos idiomas

import {
    certifications as sharedCertifications,
    contactLinks,
    socialLinks,
    technicalSkills,
    projects as sharedProjects,
} from "./cv.jsx";

const mapCertifications = (language) =>
    sharedCertifications.map(({ number, name, issuer }) => ({
        number,
        name: name[language] || name.en,
        issuer,
    }));

const mapProjects = (language) => {
    if (!sharedProjects) return [];

    const list = Array.isArray(sharedProjects) ? sharedProjects : [sharedProjects];

    return list.map(({ number, name = {}, description = {}, technologies = [] }) => ({
        number,
        name: (typeof name === "object" ? name[language] || name.en : name) || "",
        description: (typeof description === "object" ? description[language] || description.en : description) || "",
        technologies,
    }));
};

export const cvTranslations = {
    en: {
        cvHeader: {
            name: ["Angel Danilo", "Rivera Rojas"],
            subtitle: "Computer Systems Engineer",
            location: "Ocotlan, Jalisco, Mexico",
        },
        socialLinks,
        personalData: [
            "Date of Birth: 01/11/2004",
            "Nationality: Mexican",
            "Status: Student",
        ],
        contactLinks,
        profileSummary:
            "Computer Systems Engineering student, nearing graduation, with a specialization in frontend development and knowledge of software development, databases, and network infrastructure. Experienced in developing web and mobile applications using technologies such as React, TypeScript, JavaScript, HTML, CSS, and Kotlin, as well as integrating backend services and databases using Supabase and Firebase. \n\n I have gained hands-on experience in technical support, computer maintenance, and network administration during my professional internship. I am known for my analytical thinking, problem-solving skills, adaptability, and commitment to continuous learning. I am seeking my first professional opportunity in the technology industry, where I can apply my technical knowledge, contribute to organizational goals, and continue growing professionally.",
        experiences: [
            {
                role: "Waiter - Service Team",
                company: "Grupo de Meseros Excelencia",
                date: "2025 - Present",
                description:
                    "Customer-facing service role developing strong interpersonal communication, teamwork, and problem-solving skills in a fast-paced environment.",
                tags: [],
            },
            {
                role: "Bootcamp Participant",
                company: "Hewlett Packard Enterprise",
                date: "Academic Program",
                description:
                    "Participated in an intensive bootcamp by HPE, gaining hands-on experience with enterprise software practices, agile methodologies, and technology solutions.",
                tags: ["HPE", "Agile", "Enterprise"],
            },
            {
                role: "Team Leader - AWS Workshop",
                company: "AWS Cloud Club - TecNM Ocotlan (CardenalITOS)",
                date: "Workshop",
                description:
                    "Led a team in the Build Games in Minutes using Python and Amazon Q Developer workshop, coordinating tasks and driving collaborative solutions.",
                tags: ["AWS", "Python", "Amazon Q", "Team Lead"],
            },
        ],
        certifications: mapCertifications("en"),
        projects: mapProjects("en"),
        education: {
            degree: "B.Eng. Computer Systems Engineering",
            school: "Instituto Tecnologico de Ocotlan",
            year: "Expected 2027",
        },
        technicalSkills,
        softSkills: [
            "Communication",
            "Team Leadership",
            "Approachable",
            "Fast Learner",
            "Problem Solving",
        ],
        languages: [
            { name: "Spanish", level: "Native" },
            { name: "English", level: "B2", certificateUrl: "/assets/certificados/certificado-ingles.pdf", certificateLabel: "View English certificate (opens in a new tab)" },
        ],
        interests: [
            "Frontend Dev",
            "Mobile Apps",
            "Machine Learning",
            "Cloud Computing",
            "UI / UX",
        ],
        // Etiquetas para los labels de las secciones
        sections: {
            profile: "Profile",
            experience: "Experience",
            certifications: "Certifications",
            projects: "Projects",
            education: "Education",
            technicalSkills: "Technical Skills",
            softSkills: "Soft Skills",
            languages: "Languages",
            interests: "Interests",
        },
        personalDataLabel: "Personal Data",
        socialMediaLabel: "Social Media",
        pdfFilename: "Angel_Rivera_CV.pdf",
    },
    es: {
        cvHeader: {
            name: ["Angel Danilo", "Rivera Rojas"],
            subtitle: "Ingeniero en Sistemas Computacionales",
            location: "Ocotlán, Jalisco, México",
        },
        socialLinks,
        personalData: [
            "Fecha de Nacimiento: 01/11/2004",
            "Nacionalidad: Mexicana",
            "Estado: Estudiante",
        ],
        contactLinks,
        profileSummary:
            "Estudiante de Ingeniería en Sistemas Computacionales, próximo a egresar, con especialización en desarrollo frontend y conocimientos en desarrollo de software, bases de datos e infraestructura de redes. Experiencia en el desarrollo de aplicaciones web y móviles utilizando tecnologías como React, TypeScript, JavaScript, HTML, CSS y Kotlin, así como en la integración de servicios backend y bases de datos mediante Supabase y Firebase.\n\nCuento con experiencia práctica en soporte técnico, mantenimiento de equipos y administración de redes adquirida durante mis residencias profesionales. Me caracterizo por mi capacidad de análisis, resolución de problemas, adaptabilidad y aprendizaje continuo. Busco mi primera oportunidad laboral en el sector tecnológico, donde pueda aplicar mis conocimientos y continuar desarrollándome profesionalmente.",
        experiences: [
            {
                role: "Mesero - Equipo de Servicio",
                company: "Grupo de Meseros Excelencia",
                date: "2025 - Presente",
                description:
                    "Rol de servicio cara al cliente desarrollando fuertes habilidades de comunicación interpersonal, trabajo en equipo y resolución de problemas en un entorno dinámico.",
                tags: [],
            },
            {
                role: "Participante de Bootcamp",
                company: "Hewlett Packard Enterprise",
                date: "Programa Académico",
                description:
                    "Participación en bootcamp intensivo por HPE, obteniendo experiencia práctica en desarrollo de software empresarial, metodologías ágiles y soluciones tecnológicas.",
                tags: ["HPE", "Agile", "Empresarial"],
            },
            {
                role: "Líder de Equipo - Taller AWS",
                company: "AWS Cloud Club - TecNM Ocotlán (CardenalITOS)",
                date: "Taller",
                description:
                    "Lideré un equipo en el taller Build Games in Minutes usando Python y Amazon Q Developer, coordinando tareas e impulsando soluciones colaborativas.",
                tags: ["AWS", "Python", "Amazon Q", "Líder de Equipo"],
            },
        ],
        certifications: mapCertifications("es"),
        projects: mapProjects("es"),
        education: {
            degree: "Ingeniería en Sistemas Computacionales",
            school: "Instituto Tecnológico de Ocotlán",
            year: "Esperado 2027",
        },
        technicalSkills,
        softSkills: [
            "Comunicación",
            "Liderazgo de Equipo",
            "Accesible",
            "Aprendizaje Rápido",
            "Resolución de Problemas",
        ],
        languages: [
            { name: "Español", level: "Nativo" },
            { name: "Inglés", level: "B2", certificateUrl: "/assets/certificados/certificado-ingles.pdf", certificateLabel: "Ver certificado de inglés (se abre en una nueva pestaña)" },
        ],
        interests: [
            "Desarrollo Frontend",
            "Aplicaciones Móviles",
            "Machine Learning",
            "Computación en la Nube",
            "UI / UX",
        ],
        // Etiquetas para los labels de las secciones
        sections: {
            profile: "Perfil",
            experience: "Experiencia",
            certifications: "Certificaciones",
            projects: "Proyectos",
            education: "Educación",
            technicalSkills: "Habilidades Técnicas",
            softSkills: "Habilidades Blandas",
            languages: "Idiomas",
            interests: "Intereses",
        },
        personalDataLabel: "Datos Personales",
        socialMediaLabel: "Redes Sociales",
        pdfFilename: "Angel_Rivera_CV.pdf",
    },
};

// Función auxiliar para obtener las traducciones
export const getTranslation = (language = "en") => {
    return cvTranslations[language] || cvTranslations.en;
};
