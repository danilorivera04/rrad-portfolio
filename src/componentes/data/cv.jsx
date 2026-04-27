// Datos compartidos del CV separados del JSX para poder ampliar contenido sin tocar la vista.
// Si quieres agregar o ajustar contenido reutilizado, este es el lugar.

export const cvHeader = {
    name: ["Angel Danilo", "Rivera Rojas"],
    subtitle: "Computer Systems Engineer",
    location: "Ocotlan, Jalisco, Mexico",
};

export const socialLinks = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/angel-danilo-rivera-rojas-820014357/",
        iconPath:
            "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    },
];

export const contactLinks = [
    {
        label: "proxzteam@gmail.com",
        href: "mailto:proxzteam@gmail.com",
    },
    {
        label: "392 106 4092",
        href: "tel:3921064092",
    },
    {
        label: "rrad.dev",
        href: "https://rrad.dev",
        external: true,
    },
];

export const profileSummary =
    "Computer Systems Engineering student with strong focus on frontend development and mobile applications. Experienced in building full-stack projects using technologies like React, Node.js, and Android (Kotlin). Passionate about creating user-centered solutions, improving performance, and continuously learning new technologies.";

export const experiences = [
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
];

export const certifications = [
    {
        number: "01",
        name: {
            en: "Official Scrum Fundamentals Certification",
            es: "Certificación Oficial de Fundamentos Scrum",
        },
        issuer: "AIBES",
    },
    {
        number: "02",
        name: {
            en: "Professional Web Design Complete, Practical Course from Scratch",
            es: "Diseño Web Profesional Curso Completo, Práctico y desde 0",
        },
        issuer: "UDEMY",
    },
    {
        number: "03",
        name: {
            en: "JavaScript TOTAL - From Zero to Web Developer in 18 Days",
            es: "JavaScript TOTAL - De Cero a Programador Web en 18 Días",
        },
        issuer: "UDEMY",
    },
    {
        number: "04",
        name: {
            en: "React JS with TypeScript and Next.js – Full Stack Development Course",
            es: "React JS con TypeScript y Next.js Curso Desarrollo FullStack",
        },
        issuer: "UDEMY",
    },
];

export const education = {
    degree: "B.Eng. Computer Systems Engineering",
    school: "Instituto Tecnologico de Ocotlan",
    year: "Expected 2027",
};

export const technicalSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Kotlin",
    "Android",
    "HTML / CSS",
    "AWS",
    "Git",
    "REST APIs",
    "Scrum",
];

export const softSkills = [
    "Communication",
    "Team Leadership",
    "Approachable",
    "Fast Learner",
    "Problem Solving",
];

export const languages = [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "B2" },
];

export const interests = [
    "Frontend Dev",
    "Mobile Apps",
    "Machine Learning",
    "Cloud Computing",
    "UI / UX",
];