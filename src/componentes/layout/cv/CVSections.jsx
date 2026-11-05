// Bloques reutilizables para que cada seccion del CV se pueda editar sin repetir estructura.

export const CVSection = ({ label, children, className = "section" }) => (
    <section className={className}>
        <div className="section-label">{label}</div>
        {children}
    </section>
);

export const CVExperienceItem = ({ role, company, date, description, tags = [] }) => (
    <div className="exp-item">
        <div className="exp-role">{role}</div>
        <div className="exp-meta">
            <span className="exp-company">{company}</span>
            <span className="exp-date">{date}</span>
        </div>
        <p className="exp-desc">{description}</p>
        {tags.length > 0 ? (
            <div className="exp-tags">
                {tags.map((tag) => (
                    <span className="exp-tag" key={tag}>
                        {tag}
                    </span>
                ))}
            </div>
        ) : null}
    </div>
);

export const CVCertificationItem = ({ number, name, issuer }) => (
    <div className="cert-item">
        <span className="cert-num">{number}</span>
        <div>
            <div className="cert-name">{name}</div>
            <div className="cert-issuer">{issuer}</div>
        </div>
    </div>
);

export const CVChipList = ({ items, className }) => (
    <div className={className}>
        {items.map((item) => (
            <span className="skill-chip" key={item}>
                {item}
            </span>
        ))}
    </div>
);

export const CVLanguageRow = ({ name, level, certificateUrl, certificateLabel }) => (
    <div className="lang-row">
        {certificateUrl ? (
            <a className="lang-name lang-certificate" href={certificateUrl} target="_blank" rel="noopener noreferrer" aria-label={certificateLabel} title={certificateLabel}>
                {name}
            </a>
        ) : (
            <span className="lang-name">{name}</span>
        )}
        <span className="lang-level">{level}</span>
    </div>
);

export const CVProjectItem = ({ number, name, description, technologies = [] }) => (
    <div className="project-item">
        <div className="project-header">
            <span className="project-num">{number}</span>
            <div className="project-title-section">
                <div className="project-name">{name}</div>
            </div>
        </div>
        <p className="project-desc">{description}</p>
        {technologies.length > 0 ? (
            <div className="project-techs">
                {technologies.map((tech) => (
                    <span className="project-tech" key={tech}>
                        {tech}
                    </span>
                ))}
            </div>
        ) : null}
    </div>
);
