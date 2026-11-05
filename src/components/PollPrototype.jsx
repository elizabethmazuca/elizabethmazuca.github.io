import { useEffect, useState } from 'react'
import './PollPrototype.css'

const MAX_OPTIONS = 4
const DURATIONS = [2, 5, 10]

// Filled Material icons (24px grid)
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={d} fillRule="evenodd" />
  </svg>
)

const ICONS = {
  snacks:
    'M12 2a10 10 0 1 0 10 10 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-4-4zM7 11.5a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0zM10.5 16a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0zM14.6 13a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0zM8.5 6.8a1 1 0 1 0 2 0 1 1 0 1 0-2 0z',
  restroom:
    'M5.5 22v-7.5H4V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9.5V22h-4zM18 22v-6h3l-2.54-7.63C18.18 7.55 17.42 7 16.56 7h-.12c-.86 0-1.63.55-1.9 1.37L12 16h3v6h3zM7.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm9 0c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z',
  gas: 'M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
  coffee:
    'M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z',
  food: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
  close:
    'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
  share:
    'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
  clock:
    'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
}

const PRESETS = [
  { key: 'snacks', label: 'Snacks', question: 'Where to get slushies?', options: ['7-Eleven', "Buc-ee's", 'ampm'] },
  { key: 'restroom', label: 'Restroom', question: 'Bathroom break soon?', options: ['Next exit', 'Rest stop in 20 min'] },
  { key: 'gas', label: 'Gas', question: 'Need gas?', options: ['Yes', 'No'] },
  { key: 'coffee', label: 'Coffee', question: 'Coffee run?', options: ['Starbucks', 'Dutch Bros'], none: true },
  { key: 'food', label: 'Food', question: 'Where should we eat?', options: ['In-N-Out', 'Chipotle', 'Panda Express'] },
]

const emptyOptions = () => ['', '']

const MapBackground = () => (
  <svg className="poll-proto__map" viewBox="0 0 376 806" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
    <rect width="376" height="806" fill="#eef0f3" />
    <path d="M205 112 376 66v124l-152 42z" fill="#cfe8d6" />
    <path d="M-10 640 120 520" stroke="#fff" strokeWidth="10" />
    <circle cx="10" cy="470" r="120" fill="#aecbfa" opacity="0.75" />
    <path d="M-20 258 396 150" stroke="#fff" strokeWidth="14" />
    <path d="M396 40 214 820" stroke="#f3d77c" strokeWidth="15" />
    <path d="M396 40 214 820" stroke="#fde9a8" strokeWidth="10" />
    <path d="M250-10 120 820" stroke="#1a73e8" strokeWidth="6" />
  </svg>
)

export default function PollPrototype() {
  const [preset, setPreset] = useState(null)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(emptyOptions)
  const [includeNone, setIncludeNone] = useState(false)
  const [duration, setDuration] = useState(5)
  const [sent, setSent] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [noneHint, setNoneHint] = useState(false)
  const [vote, setVote] = useState(null)

  // "None" counts toward the 4-choice limit
  const maxTyped = includeNone ? MAX_OPTIONS - 1 : MAX_OPTIONS
  const noneBlocked = !includeNone && options.length >= MAX_OPTIONS
  const filledOptions = options.filter((o) => o.trim())
  const canSend = question.trim() && filledOptions.length >= 2
  const pollOptions = [...filledOptions, ...(includeNone ? ['None'] : [])]

  useEffect(() => {
    if (!sent || secondsLeft <= 0) return
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [sent, secondsLeft])

  const applyPreset = (p) => {
    setPreset(p.key)
    setQuestion(p.question)
    setOptions([...p.options])
    setIncludeNone(Boolean(p.none))
    setNoneHint(false)
  }

  const updateOption = (i, value) => {
    setPreset(null)
    setOptions((prev) => prev.map((o, j) => (j === i ? value : o)))
  }

  const removeOption = (i) => {
    setPreset(null)
    setNoneHint(false)
    setOptions((prev) => prev.filter((_, j) => j !== i))
  }

  const send = () => {
    if (!canSend) return
    setSent(true)
    setVote(null)
    setSecondsLeft(duration * 60)
  }

  const reset = () => {
    setSent(false)
    setNoneHint(false)
    setPreset(null)
    setQuestion('')
    setOptions(emptyOptions())
    setIncludeNone(false)
    setDuration(5)
  }

  const clock = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`

  return (
    <div className="poll-proto-frame">
      <div className="poll-proto" aria-label="Interactive poll prototype">
        <div className="poll-proto__screen">
          <MapBackground />
          <div className="poll-proto__island" />

          {sent ? (
            <div className="poll-proto__sheet poll-proto__sheet--sent" key="sent">
              <span className="poll-proto__dot" aria-hidden="true" />
              <div className="poll-proto__handle" />

              <div className="poll-proto__header">
                <div className="poll-proto__heading">
                  <p className="poll-proto__eyebrow">Caravan Poll</p>
                  <p className="poll-proto__title">{question}</p>
                </div>
                <div className="poll-proto__actions">
                  <span className="poll-proto__circle-btn" aria-hidden="true">
                    <Icon d={ICONS.share} size={20} />
                  </span>
                  <button type="button" className="poll-proto__circle-btn" onClick={reset} aria-label="Close poll">
                    <Icon d={ICONS.close} size={22} />
                  </button>
                </div>
              </div>

              <div className="poll-proto__live">
                <Icon d={ICONS.clock} size={22} />
                <div className="poll-proto__live-body">
                  <p className="poll-proto__live-text">
                    <strong>Live</strong> · Voting closes in {clock}
                  </p>
                  <div className="poll-proto__progress">
                    <span style={{ width: `${(secondsLeft / (duration * 60)) * 100}%` }} />
                  </div>
                </div>
              </div>

              <div className="poll-proto__choices" role="radiogroup" aria-label={question}>
                {pollOptions.map((o, i) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={vote === i}
                    key={i}
                    className={`poll-proto__choice${vote === i ? ' poll-proto__choice--on' : ''}`}
                    onClick={() => setVote(i)}
                  >
                    {o}
                  </button>
                ))}
              </div>

              <div className="poll-proto__footer">
                <button type="button" className="poll-proto__send poll-proto__send--ready" onClick={reset}>
                  <Icon d={ICONS.add} size={22} />
                  Make another poll
                </button>
              </div>
            </div>
          ) : (
            <div className="poll-proto__sheet poll-proto__sheet--form" key="form">
              <div className="poll-proto__handle" />

              <div className="poll-proto__header">
                <p className="poll-proto__title">Start A Poll</p>
                <button type="button" className="poll-proto__circle-btn" onClick={reset} aria-label="Clear poll">
                  <Icon d={ICONS.close} size={22} />
                </button>
              </div>

              <div className="poll-proto__body">
                <div className="poll-proto__chips">
                  {PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.key}
                      className={`poll-proto__chip${preset === p.key ? ' poll-proto__chip--on' : ''}`}
                      onClick={() => applyPreset(p)}
                    >
                      <Icon d={ICONS[p.key]} />
                      {p.label}
                    </button>
                  ))}
                </div>

                <label className="poll-proto__label" htmlFor="poll-proto-question">
                  Question
                </label>
                <input
                  id="poll-proto-question"
                  className="poll-proto__field"
                  placeholder="Ask the caravan a question"
                  value={question}
                  maxLength={40}
                  onChange={(e) => {
                    setPreset(null)
                    setQuestion(e.target.value)
                  }}
                />

                <p className="poll-proto__label">Options</p>
                <div className="poll-proto__options">
                  {options.map((o, i) => (
                    <div className="poll-proto__option" key={i}>
                      <input
                        className="poll-proto__field"
                        placeholder={`Option ${i + 1}`}
                        value={o}
                        maxLength={20}
                        aria-label={`Option ${i + 1}`}
                        onChange={(e) => updateOption(i, e.target.value)}
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          className="poll-proto__remove"
                          onClick={() => removeOption(i)}
                          aria-label={`Remove option ${i + 1}`}
                        >
                          <Icon d={ICONS.close} size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  {includeNone && <div className="poll-proto__field poll-proto__field--none">None</div>}
                </div>
                {options.length < maxTyped ? (
                  <button
                    type="button"
                    className="poll-proto__add"
                    onClick={() => setOptions((prev) => [...prev, ''])}
                  >
                    <Icon d={ICONS.add} size={20} />
                    Add option
                  </button>
                ) : (
                  <p className="poll-proto__hint">4 choices max to keep it quick</p>
                )}

                <div className="poll-proto__row">
                  <span>Include “None”</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeNone}
                    aria-label="Include None"
                    className={`poll-proto__toggle${includeNone ? ' poll-proto__toggle--on' : ''}`}
                    aria-disabled={noneBlocked}
                    onClick={() => (noneBlocked ? setNoneHint(true) : setIncludeNone((v) => !v))}
                  />
                </div>
                {noneBlocked && noneHint && (
                  <p className="poll-proto__hint">Remove an option to add “None”</p>
                )}

                <div className="poll-proto__row">
                  <span>Voting closes in</span>
                  <div className="poll-proto__segments" role="radiogroup" aria-label="Voting closes in">
                    <span
                      className="poll-proto__thumb"
                      style={{ transform: `translateX(${DURATIONS.indexOf(duration) * 100}%)` }}
                      aria-hidden="true"
                    />
                    {DURATIONS.map((d) => (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={duration === d}
                        key={d}
                        className={`poll-proto__segment${duration === d ? ' poll-proto__segment--on' : ''}`}
                        onClick={() => setDuration(d)}
                      >
                        {d} min
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="poll-proto__footer">
                <button
                  type="button"
                  className={`poll-proto__send${canSend ? ' poll-proto__send--ready' : ''}`}
                  disabled={!canSend}
                  onClick={send}
                >
                  <Icon d={ICONS.send} size={20} />
                  Send poll
                </button>
                {!canSend && <p className="poll-proto__footnote">Add a question and at least 2 options</p>}
              </div>
            </div>
          )}

          <div className="poll-proto__home" />
        </div>
      </div>
    </div>
  )
}
