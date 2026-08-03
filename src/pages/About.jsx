import ImageSlot from '../components/ImageSlot.jsx'
import FlipCard from '../components/FlipCard.jsx'
import Typewriter from '../components/Typewriter.jsx'
import './About.css'

const factsPhrases = [
  'raised monarch butterflies',
  "worked as santa's elf",
  'have watched 100+ animes',
  'sharpen my own kitchen knives',
  'have my fishing license',
]

const communities = [
  {
    label: 'ACM',
    image: '/images/about/communities/acm.jpg',
    rotation: -4,
    back: 'Hosting workshops, growing with a community of student designers and developers, and eating a lot of pizza...',
  },
  {
    label: 'Friends of Figma',
    image: '/images/about/communities/friends-of-figma.jpg',
    rotation: 3,
    back: 'Connecting with design talent in my own backyard.',
  },
  {
    label: 'Fullyhacks',
    image: '/images/about/communities/fullyhacks.jpg',
    rotation: -3,
    back: "Leading design for CSUF's largest hackathon, from early ideas to shipped experiences.",
  },
  {
    label: 'CKI',
    image: '/images/about/communities/cki.jpg',
    rotation: 4,
    back: 'Volunteering with my community for 100+ hours and focusing on service and giving back.',
  },
  {
    label: 'Titan Rover',
    image: '/images/about/communities/titan-rover.jpg',
    rotation: -3,
    back: 'Designing rover interfaces with engineers to make complex controls feel simple.',
  },
]

export default function About() {
  return (
    <main className="page about-page">
      <section className="about-hero">
        <h1 className="about-hero__heading">
          Hello! I&rsquo;m <em>Elizabeth Mazuca</em>{' '}
          <span className="about-hero__glyphs" aria-hidden="true">
            ₊ ⊹
          </span>
          <br />
          <span className="about-hero__facts">
            I <Typewriter phrases={factsPhrases} />
          </span>
        </h1>
      </section>

      <hr className="about-divider" />

      <section className="about-intro">
        <div className="about-intro__photo">
          <ImageSlot src="/images/about/photo.jpg" alt="Elizabeth Mazuca" />
        </div>
        <div className="about-intro__content">
          <p className="about-intro__bio">
            Problem-solving comes naturally to me. As the eldest daughter, I&rsquo;ve grown up
            supporting others and bringing clarity to complex solutions. Whether I&rsquo;m
            designing user experiences, or waitressing on weekends, I enjoy reading people,
            anticipating needs, and adapting in real time.
          </p>
          <div className="about-contact">
            <div className="about-contact__row">
              <span className="about-contact__label">Email</span>
              <a href="mailto:mazucachu@gmail.com" className="about-contact__value">
                mazucachu@gmail.com <span className="about-contact__icon">↗</span>
              </a>
            </div>
            <div className="about-contact__row">
              <span className="about-contact__label">X / Twitter</span>
              <a
                href="https://x.com/elzieonline"
                target="_blank"
                rel="noreferrer"
                className="about-contact__value"
              >
                @elzieonline <span className="about-contact__icon">↗</span>
              </a>
            </div>
            <div className="about-contact__row">
              <span className="about-contact__label">Résumé</span>
              <a href="/resume" className="about-contact__value">
                view full resume <span className="about-contact__icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-communities">
        <div className="about-communities__heading">
          <h2>My Communities</h2>
          <span className="about-communities__hint">Tap to flip</span>
        </div>
        <div className="about-communities__row">
          {communities.map((c) => (
            <FlipCard
              key={c.label}
              label={c.label}
              image={c.image}
              rotation={c.rotation}
              back={c.back}
            />
          ))}
        </div>
      </section>

      <section className="about-outro">
        <div className="about-outro__stack">
          <div className="about-outro__graphic">
            <ImageSlot src="/images/about/Fishascii.png" alt="" rounded={false} fit="contain" />
          </div>
        </div>
        <p className="about-outro__text">thanks for visiting :)</p>
      </section>
    </main>
  )
}
