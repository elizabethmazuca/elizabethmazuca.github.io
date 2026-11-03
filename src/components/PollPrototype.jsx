import { useEffect, useState } from 'react'
import './PollPrototype.css'

const MAX_OPTIONS = 4
const DURATIONS = [2, 5, 10]

const Icon = ({ children }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const icons = {
  snacks: (
    <Icon>
      <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z" />
      <circle cx="8.5" cy="12" r="0.6" fill="currentColor" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
      <circle cx="15.5" cy="14" r="0.6" fill="currentColor" />
    </Icon>
  ),
  gas: (
    <Icon>
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10" />
      <path d="M14 8h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3" />
    </Icon>
  ),
  coffee: (
    <Icon>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3v2M12 3v2" />
    </Icon>
  ),
  food: (
    <Icon>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 21V3c-2 1-3 4-3 7h3" />
    </Icon>
  ),
  restroom: (
    <Icon>
      <circle cx="7" cy="5" r="1.5" />
      <circle cx="17" cy="5" r="1.5" />
      <path d="M5 21v-6H4l1.5-6h3L10 15H9v6M15 21V9h4v12M12 3v18" />
    </Icon>
  ),
}

const PRESETS = [
  { key: 'snacks', label: 'Snacks', question: 'Where to get slushies?', options: ['7-Eleven', "Buc-ee's", 'ampm'] },
  { key: 'gas', label: 'Gas', question: 'Need gas?', options: ['Yes', 'No'] },
  { key: 'coffee', label: 'Coffee', question: 'Coffee run?', options: ['Starbucks', "Dutch Bros", 'Skip it'] },
  { key: 'food', label: 'Food', question: 'Where should we eat?', options: ['In-N-Out', 'Chipotle', 'Panda Express'] },
  { key: 'restroom', label: 'Restroom', question: 'Bathroom break soon?', options: ['Next exit', 'Rest stop in 20 min'] },
]

const emptyOptions = () => ['', '']

export default function PollPrototype() {
  const [preset, setPreset] = useState(null)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(emptyOptions)
  const [includeNone, setIncludeNone] = useState(false)
  const [duration, setDuration] = useState(5)
  const [sent, setSent] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [noneHint, setNoneHint] = useState(false)

  // "None of these" counts toward the 4-choice limit
  const maxTyped = includeNone ? MAX_OPTIONS - 1 : MAX_OPTIONS
  const noneBlocked = !includeNone && options.length >= MAX_OPTIONS
  const filledOptions = options.filter((o) => o.trim())
  const canSend = question.trim() && filledOptions.length >= 2

  useEffect(() => {
    if (!sent || secondsLeft <= 0) return
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [sent, secondsLeft])

  const applyPreset = (p) => {
    setPreset(p.key)
    setQuestion(p.question)
    setOptions([...p.options])
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
          <div className="poll-proto__island" />

          {sent ? (
            <div className="poll-proto__sent">
              <div className="poll-proto__check" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </div>
              <p className="poll-proto__sent-title">Poll sent to the caravan</p>
              <p className="poll-proto__sent-sub">Voting closes in {clock}</p>

              <div className="poll-proto__preview">
                <p className="poll-proto__preview-q">{question}</p>
                {[...filledOptions, ...(includeNone ? ['None of these'] : [])].map((o, i) => (
                  <div className="poll-proto__preview-opt" key={i}>
                    <span className="poll-proto__radio" />
                    {o}
                  </div>
                ))}
              </div>

              <button type="button" className="poll-proto__send poll-proto__send--ready" onClick={reset}>
                Make another poll
              </button>
            </div>
          ) : (
            <>
              <div className="poll-proto__header">
                <button type="button" className="poll-proto__icon-btn" onClick={reset} aria-label="Clear poll">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
                <p className="poll-proto__title">Add a stop</p>
              </div>

              <div className="poll-proto__body">
                <p className="poll-proto__label">Quick start</p>
                <div className="poll-proto__chips">
                  {PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.key}
                      className={`poll-proto__chip${preset === p.key ? ' poll-proto__chip--on' : ''}`}
                      onClick={() => applyPreset(p)}
                    >
                      {icons[p.key]}
                      {p.label}
                    </button>
                  ))}
                </div>

                <label className="poll-proto__label" htmlFor="poll-proto-question">
                  Question
                </label>
                <input
                  id="poll-proto-question"
                  className="poll-proto__question"
                  placeholder="Ask the caravan..."
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
                      <span className="poll-proto__num">{i + 1}</span>
                      <input
                        className="poll-proto__option-input"
                        placeholder={`Option ${i + 1}`}
                        value={o}
                        maxLength={20}
                        aria-label={`Option ${i + 1}`}
                        onChange={(e) => updateOption(i, e.target.value)}
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          className="poll-proto__icon-btn poll-proto__remove"
                          onClick={() => removeOption(i)}
                          aria-label={`Remove option ${i + 1}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6 6 18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  {includeNone && (
                    <div className="poll-proto__option poll-proto__option--none">
                      <span className="poll-proto__num">–</span>
                      None of these
                    </div>
                  )}
                  {options.length < maxTyped ? (
                    <button
                      type="button"
                      className="poll-proto__add"
                      onClick={() => setOptions((prev) => [...prev, ''])}
                    >
                      + Add option
                    </button>
                  ) : (
                    <p className="poll-proto__hint">4 choices max to keep it quick</p>
                  )}
                </div>

                <div className="poll-proto__row">
                  <span>Include “None of these”</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={includeNone}
                    aria-label="Include None of these"
                    className={`poll-proto__toggle${includeNone ? ' poll-proto__toggle--on' : ''}`}
                    aria-disabled={noneBlocked}
                    onClick={() => (noneBlocked ? setNoneHint(true) : setIncludeNone((v) => !v))}
                  />
                </div>
                {noneBlocked && noneHint && (
                  <p className="poll-proto__hint poll-proto__hint--left">Remove an option to add “None of these”</p>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                    <path d="M21 3 3 10.5l7 2.5 2.5 7z M10 13l5-5" />
                  </svg>
                  Send poll
                </button>
                <p className="poll-proto__footnote">
                  {canSend ? '\u00a0' : 'Add a question and at least 2 options'}
                </p>
              </div>
            </>
          )}

          <div className="poll-proto__home" />
        </div>
      </div>
    </div>
  )
}
