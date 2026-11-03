import { Link, useParams } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import LottieSlot from '../components/LottieSlot.jsx'
import PollPrototype from '../components/PollPrototype.jsx'
import Tag from '../components/Tag.jsx'
import { projects } from '../data/projects.js'
import { renderRichText } from '../utils/richText.jsx'
import './ProjectDetail.css'

function renderBody(body, links) {
  if (!links || !links.length) return body
  const matches = links
    .map((link) => ({ ...link, idx: body.indexOf(link.text) }))
    .filter((link) => link.idx !== -1)
    .sort((a, b) => a.idx - b.idx)
  if (!matches.length) return body

  const nodes = []
  let cursor = 0
  matches.forEach((match, i) => {
    nodes.push(body.slice(cursor, match.idx))
    nodes.push(
      <a
        key={i}
        href={match.href}
        target="_blank"
        rel="noopener noreferrer"
        className="case-study__link"
      >
        {match.text}
      </a>,
    )
    cursor = match.idx + match.text.length
  })
  nodes.push(body.slice(cursor))
  return nodes
}

function CaseStudySection({ section }) {
  const placeholderCount = section.images || (section.image || section.lottie ? 1 : 0)
  const className = section.centered ? 'case-study__section case-study__section--centered' : 'case-study__section'

  const bodyLinks = section.bodyLinks
    ? section.bodyLinks
    : section.bodyLinkText
      ? [{ text: section.bodyLinkText, href: section.bodyLinkHref }]
      : undefined

  const bodyEl = section.body && (
    <>
      {section.body.split('\n\n').map((paragraph, i) => (
        <p key={i} className="case-study__body">
          {renderBody(paragraph, bodyLinks)}
        </p>
      ))}
    </>
  )

  const embedEl = section.embed && (
    <iframe
      className="case-study__embed"
      src={section.embed}
      title={section.embedTitle || ''}
      loading="lazy"
      tabIndex={-1}
    />
  )

  const videoEl = section.video && (
    <video
      className={
        section.imageSize
          ? `case-study__image case-study__image--${section.imageSize}`
          : 'case-study__image'
      }
      src={section.video}
      autoPlay
      loop
      muted
      playsInline
      controls
    />
  )

  const cardsEl = section.cards && (
    <div
      className="case-study__cards"
      style={{
        '--card-bg': section.cardsColor || undefined,
        '--card-title': section.cardsTitleColor || undefined,
      }}
    >
      {section.cards.map((card) => (
        <div className="case-study__card" key={card.title}>
          <h3 className="case-study__card-title">{card.title}</h3>
          <p className="case-study__card-body">{card.body}</p>
        </div>
      ))}
    </div>
  )

  const carouselEl = section.carousel && (
    <Carousel
      slides={section.carousel}
      alt={section.heading}
      aspect={section.carouselAspect}
      maxWidth={section.carouselMaxWidth}
    />
  )

  const mediaRowEl = section.media && (
    <div className="case-study__media-row">
      {section.media.map((item, i) =>
        item.crop ? (
          <div
            key={i}
            className="case-study__media-crop"
            style={item.aspect ? { aspectRatio: item.aspect } : undefined}
          >
            <img
              src={item.src}
              alt=""
              style={{
                transform: `scale(${item.scale || 1})`,
                transformOrigin: 'center',
                objectPosition: item.position || 'center',
              }}
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
  )

  const placeholderRowEl = placeholderCount > 0 && (
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
              background={section.lottieBackground}
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
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: section.imageCropPosition || 'top',
              }}
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
  )

  const renderExtra = (item, i) => {
    if (item.text) {
      // Extra space above text that starts a new group, separating it from the media above
      const groupClass =
        (item.group ? ' case-study__body--group' : '') + (item.centered ? ' case-study__body--center' : '')
      if (item.heading) {
        return (
          <div key={i} className={`case-study__subsection${groupClass}`}>
            <h3 className="case-study__subheading">{item.heading}</h3>
            <p className="case-study__body">{item.text}</p>
          </div>
        )
      }
      return (
        <p key={i} className={`case-study__body${groupClass}`}>
          {item.text}
        </p>
      )
    }
    if (item.row) {
      return (
        <div key={i} className="case-study__extra-row">
          {item.row.map(renderExtra)}
        </div>
      )
    }
    const src = typeof item === 'string' ? item : item.src
    const mediaStyle =
      item.grow || item.width ? { flexGrow: item.grow, width: item.width } : undefined
    if (src.endsWith('.mp4')) {
      return (
        <video
          key={i}
          className="case-study__image case-study__image--extra"
          style={mediaStyle}
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      )
    }
    return (
      <img
        key={i}
        src={src}
        alt=""
        className="case-study__image case-study__image--extra"
        style={
          item.aspect
            ? {
                ...mediaStyle,
                aspectRatio: item.aspect,
                objectFit: 'cover',
                objectPosition: item.position || 'center',
              }
            : mediaStyle
        }
      />
    )
  }

  const headingEl = (
    <>
      {section.eyebrow && <p className="case-study__eyebrow">{section.eyebrow}</p>}
      {section.heading && <h2 className="case-study__heading">{section.heading}</h2>}
    </>
  )
  // Prototype sections keep their heading in the text column beside the device
  const headingInSplit = section.prototype && section.sideBySide

  const prototypeEl = section.prototype === 'poll' && (
    <div className="case-study__prototype">
      <PollPrototype />
    </div>
  )

  const extraContentEl = section.extraContent && section.extraContent.map(renderExtra)

  return (
    <section className={className}>
      {!headingInSplit && headingEl}

      {section.sideBySide ? (
        <div
          className={
            section.splitCompact
              ? 'case-study__split case-study__split--compact'
              : 'case-study__split'
          }
        >
          {section.sideBySide === 'reverse' ? (
            <>
              <div
                className={
                  section.prototype
                    ? 'case-study__split-text case-study__split-text--prototype'
                    : 'case-study__split-text'
                }
              >
                {headingInSplit && headingEl}
                {bodyEl}
                {section.prototype && section.caption && (
                  <div className="case-study__try">
                    <p className="case-study__caption case-study__caption--left">{section.caption}</p>
                    <svg
                      className="case-study__try-arrow"
                      viewBox="0 0 120 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12h114M104 2l12 10-12 10" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="case-study__split-media">
                {prototypeEl}
                {placeholderRowEl}
              </div>
            </>
          ) : (
            <>
              <div className="case-study__split-media">{placeholderRowEl}</div>
              <div className="case-study__split-text">{bodyEl}</div>
            </>
          )}
        </div>
      ) : (
        <>
          {bodyEl}
          {prototypeEl}
          {embedEl}
          {videoEl}
          {cardsEl}
          {carouselEl}
          {mediaRowEl}
          {placeholderRowEl}
          {extraContentEl}
        </>
      )}

      {section.caption && !(section.prototype && section.sideBySide) && <p className="case-study__caption">{section.caption}</p>}
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
      <p className="project-detail__tagline">{renderRichText(project.tagline)}</p>
      <div className="project-detail__tags">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="project-detail__cover">
        {project.lottie ? (
          <LottieSlot src={project.lottie} fallback={project.cover} alt={project.title} align="top" />
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
