// Cabecera del CV dividida en bloques pequeños para que sea facil ampliar contacto o redes.
const SocialLink = ({ label, href, iconPath }) => (
    <a
        className="social-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
    >
        <span>{label}</span>
        <span className="social-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d={iconPath} />
            </svg>
        </span>
    </a>
);

const CVHeader = ({ header, socialLinks, personalData, contactLinks }) => {
    return (
        <header className="cv-header">
            <div className="header-inner">
                <div className="header-main">
                    <h1 className="header-name">
                        {header.name[0]}
                        <br />
                        {header.name[1]}
                    </h1>
                    <p className="header-sub">{header.subtitle}</p>
                    <p className="header-location">{header.location}</p>
                </div>

                <div className="header-social">
                    <div className="social-block social-block-media">
                        <p className="social-title">Social Media</p>
                        <div className="social-links">
                            {socialLinks.map((link) => (
                                <SocialLink key={link.label} {...link} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="header-contacts">
                    <div className="social-block social-block-personal">
                        <p className="social-title">Personal Data</p>
                        <div className="personal-data">
                            {personalData.map((item) => (
                                <span className="personal-item" key={item}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {contactLinks.map((contact) => (
                        <a
                            className="contact-item"
                            href={contact.href}
                            key={contact.label}
                            target={contact.external ? "_blank" : undefined}
                            rel={contact.external ? "noopener noreferrer" : undefined}
                        >
                            {contact.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default CVHeader;