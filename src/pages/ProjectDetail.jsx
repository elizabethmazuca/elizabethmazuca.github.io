import { Link, useParams } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import LottieSlot from '../components/LottieSlot.jsx'
import Tag from '../components/Tag.jsx'
import { projects } from '../data/projects.js'
import './ProjectDetail.css'

function renderBody(body, linkText, linkHref) {
  if (!linkText) return body
  const idx = body.indexOf(linkText)
  if (idx === -1) return body
  return (
    <>
      {body.slice(0, idx)}
      <a href={linkHref} target="_blank" rel="noopener noreferrer" className="case-study__link">
        {linkText}
      </a>
      {body.slice(idx + linkText.length)}
    </>
  )
}

function CaseStudySection({ section }) {
  const placeholderCount = section.images || (section.image || section.lottie ? 1 : 0)
  const className = section.centered ? 'case-study__section case-study__section--centered' : 'case-study__section'

  return (
    <section className={className}>
      {section.eyebrow && <p className="case-study__eyebrow">{section.eyebrow}</p>}
      <h2 className="case-study__heading">{section.heading}</h2>
      {section.body && (
        <p className="case-study__body">{renderBody(section.body, section.bodyLinkText, section.bodyLinkHref)}</p>
      )}

      {section.cards && (
        <div className="case-study__cards">
          {section.cards.map((card) => (
            <div className="case-study__card" key={card.title}>
              <h3 className="case-study__card-title">{card.title}</h3>
              <p className="case-study__card-body">{card.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.carousel && <Carousel images={section.carousel} alt={section.heading} />}

      {section.media && (
        <div className="case-study__media-row">
          {section.media.map((item, i) =>
            item.crop ? (
              <div key={i} className="case-study__media-crop">
                <img
                  src={item.src}
                  alt=""
                  style={{ transform: `scale(${item.scale || 1})`, transformOrigin: 'center' }}
                />
              </div>
            ) : (
              <img
                key={i}
                src={item.src}
                alt=""
                className="case-study__media-item"
                style={item.width ? { maxWidth: item.width } : undefined}
              />
            ),
          )}
        </div>
      )}

      {placeholderCount > 0 && (
        <div className="case-study__placeholder-row">
          {Array.from({ length: placeholderCount }).map((_, i) => {
            const aspectClass = `case-study__placeholder case-study__placeholder--${section.imageAspect || 'wide'}`
            if (i === 0 && section.lottie) {
              return (
                <LottieSlot
                  key={i}
                  src={section.lottie}
                  alt=""
                  className={aspectClass}
                  scale={section.lottieScale || 1}
                  heightScale={section.lottieHeightScale || 100}
                  playWhenCentered={section.lottiePlayWhenCentered}
                />
              )
            }
            if (i === 0 && typeof section.image === 'string' && section.imageCrop) {
              return (
                <img
                  key={i}
                  src={section.image}
                  alt=""
                  className={aspectClass}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              )
            }
            if (i === 0 && typeof section.image === 'string') {
              const imageClass = section.imageSize
                ? `case-study__image case-study__image--${section.imageSize}`
                : 'case-study__image'
              return <img key={i} src={section.image} alt="" className={imageClass} />
            }
            return <div key={i} className={aspectClass} />
          })}
        </div>
      )}

      {section.caption && <p className="case-study__caption">{section.caption}</p>}
    </section>
  )
}

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
      {project.caseStudy ? (
        <div className="case-study">
          <div className="case-study__meta">
            {project.caseStudy.meta.map((item) => (
              <div className="case-study__meta-item" key={item.label}>
                <p className="case-study__meta-label">{item.label}</p>
                {(Array.isArray(item.value) ? item.value : [item.value]).map((line) => (
                  <p className="case-study__meta-value" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {project.caseStudy.sections.map((section, i) => (
            <CaseStudySection section={section} key={i} />
          ))}
        </div>
      ) : (
        <p className="project-detail__placeholder-note">
          Case study content coming soon — drop write-up copy and images in
          <code> /public/images/work/</code> and this page will fill in.
        </p>
      )}
    </main>
  )
}
