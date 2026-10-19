import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot.jsx'
import LottieSlot from '../components/LottieSlot.jsx'
import Tag from '../components/Tag.jsx'
import { projects } from '../data/projects.js'
import { renderRichText } from '../utils/richText.jsx'
import './Work.css'

function ProjectCard({ project }) {
  return (
    <Link to={`/work/${project.slug}`} className="project-card">
      <div className="project-card__image">
        {project.lottie ? (
          <LottieSlot
            src={project.lottie}
            fallback={project.cover}
            alt={project.title}
            scale={project.thumbnailScale || 1.15}
            align={project.thumbnailAlign || 'center'}
          />
        ) : (
          <ImageSlot src={project.cover} alt={project.title} />
        )}
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__tagline">{renderRichText(project.tagline)}</p>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  )
}

export default function Work() {
  const left = projects.filter((p) => p.column === 'left')
  const right = projects.filter((p) => p.column === 'right')

  return (
    <main className="page work-page">
      <h1 className="work-page__heading">
        I&rsquo;m <span className="work-page__highlight">Elizabeth Mazuca</span>
        <br />
        I <em>build</em>{' '}
        <img src="/images/wrench.svg" alt="" className="work-page__icon work-page__icon--wrench" />{' '}
        interactive worlds
        <br />
        through iteration and <em>storytelling</em>{' '}
        <span className="work-page__icon work-page__icon--star" aria-hidden="true">
          <img src="/images/work/VectorStarTails.svg" alt="" className="work-page__star-part work-page__star-part--tails" />
          <img src="/images/work/VectorSmallStar.svg" alt="" className="work-page__star-part work-page__star-part--small" />
          <img src="/images/work/VectorBigStar.svg" alt="" className="work-page__star-part work-page__star-part--big" />
        </span>
      </h1>
      <p className="work-page__subtext">
        I&rsquo;ve designed rover interfaces, led hackathon onboarding, and used AI to deploy
        passion projects along the way.
      </p>

      <hr className="work-page__divider" />

      <div className="work-page__grid">
        <div className="work-page__column">
          {left.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="work-page__column work-page__column--offset">
          {right.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
