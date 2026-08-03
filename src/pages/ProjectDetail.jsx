import { Link, useParams } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot.jsx'
import LottieSlot from '../components/LottieSlot.jsx'
import Tag from '../components/Tag.jsx'
import { projects } from '../data/projects.js'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="page project-detail">
        <p>
          Project not found. <Link to="/">Back to work</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page project-detail">
      <Link to="/" className="project-detail__back">
        ← back to work
      </Link>
      <h1 className="project-detail__title">{project.title}</h1>
      <p className="project-detail__tagline">{project.tagline}</p>
      <div className="project-detail__tags">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="project-detail__cover">
        {project.lottie ? (
          <LottieSlot src={project.lottie} fallback={project.cover} alt={project.title} />
        ) : (
          <ImageSlot src={project.cover} alt={project.title} />
        )}
      </div>
      <p className="project-detail__placeholder-note">
        Case study content coming soon — drop write-up copy and images in
        <code> /public/images/work/</code> and this page will fill in.
      </p>
    </main>
  )
}
