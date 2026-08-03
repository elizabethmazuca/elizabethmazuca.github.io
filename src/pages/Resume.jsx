import { Link } from 'react-router-dom'
import Tag from '../components/Tag.jsx'
import {
  contact,
  summary,
  experience,
  experienceSecondary,
  projects,
  education,
  skills,
} from '../data/resume.js'
import './Resume.css'

function OrgLink({ href, children }) {
  if (!href || href === '#') {
    return <span className="resume-entry__org">{children}</span>
  }
  if (href.startsWith('/')) {
    return (
      <Link to={href} className="resume-entry__link">
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className="resume-entry__link" target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function ExperienceEntry({ entry }) {
  return (
    <div className="resume-entry">
      <div className="resume-entry__row">
        <h3 className="resume-entry__title">
          {entry.role} · <OrgLink href={entry.orgLink}>{entry.org}</OrgLink>
          {entry.extra && <span className="resume-entry__extra"> — {entry.extra}</span>}
        </h3>
        <span className="resume-entry__date">{entry.date}</span>
      </div>
      <p className="resume-entry__description">{entry.description}</p>
    </div>
  )
}

export default function Resume() {
  return (
    <main className="page resume-page">
      <div className="resume-card">
        <div className="resume-card__header">
          <div>
            <h1 className="resume-card__name">{contact.name}</h1>
            <p className="resume-card__subtitle">{contact.title}</p>
            <p className="resume-card__contact">
              {contact.email} · {contact.phone} ·{' '}
              <a
                href={contact.siteLink}
                className="resume-entry__link"
                target="_blank"
                rel="noreferrer"
              >
                {contact.site}
              </a>
            </p>
          </div>
          <a
            className="resume-card__download"
            href="/resume/Elizabeth_Mazuca_Resume.pdf"
            download
          >
            ↓ Download PDF
          </a>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label" />
          <div className="resume-card__content">
            <p className="resume-card__summary">{summary}</p>
          </div>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label">Experience</span>
          <div className="resume-card__content">
            {experience.map((entry) => (
              <ExperienceEntry key={entry.role + entry.org} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label" />
          <div className="resume-card__content">
            {experienceSecondary.map((entry) => (
              <ExperienceEntry key={entry.role + entry.org} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label">Projects</span>
          <div className="resume-card__content">
            {projects.map((entry) => (
              <ExperienceEntry key={entry.role} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label">Education</span>
          <div className="resume-card__content">
            <h3 className="resume-entry__title">{education.degree}</h3>
            <p className="resume-entry__description">{education.detail}</p>
          </div>
        </div>

        <div className="resume-card__section">
          <span className="resume-card__label">Skills</span>
          <div className="resume-card__content resume-card__skills">
            {skills.map((skill) => (
              <Tag key={skill}>{skill.toUpperCase()}</Tag>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
