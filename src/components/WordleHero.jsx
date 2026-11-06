import { useEffect, useRef, useState } from 'react'
import useStageFit from '../utils/useStageFit.js'
import './WordleHero.css'

const STAGE_W = 1024
const STAGE_H = 640
const CARD_W = 300
// Taller than the game needs, so there's white space under the keyboard
const CARD_H = 436
const ANSWER = 'SNAFU'
const GUESSES = ['CRANE', 'SAINT', 'SNACK', 'SNAFU']
const ROWS = 6
const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', ['ENTER', ...'ZXCVBNM', 'DEL']]

const TYPE_MS = 170
const FLIP_STAGGER_MS = 250
const FLIP_MS = 450

// Standard scoring, so repeated letters only count as often as the answer has them
function score(guess) {
  const result = Array(5).fill('absent')
  const left = {}
  for (let i = 0; i < 5; i++) {
    if (guess[i] === ANSWER[i]) result[i] = 'correct'
    else left[ANSWER[i]] = (left[ANSWER[i]] || 0) + 1
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] !== 'correct' && left[guess[i]]) {
      result[i] = 'present'
      left[guess[i]] -= 1
    }
  }
  return result
}

const SCORES = GUESSES.map(score)
const RANK = { absent: 1, present: 2, correct: 3 }

const INITIAL = { typed: Array(ROWS).fill(''), submitted: 0, kb: 0, win: false, toast: false, modal: false, fading: false }
const FINAL = { ...INITIAL, typed: [...GUESSES, '', ''], submitted: GUESSES.length, kb: GUESSES.length, modal: true }

// Each loop opens with the first guesses already on the board (no flip),
// right before SNACK is typed
const PRESOLVED = 2
const START = {
  ...INITIAL,
  typed: INITIAL.typed.map((t, r) => (r < PRESOLVED ? GUESSES[r] : t)),
  submitted: PRESOLVED,
  kb: PRESOLVED,
}

// The whole loop as [wait ms, state update] steps
const STEPS = [[900, (s) => s]]
GUESSES.forEach((word, r) => {
  if (r < PRESOLVED) return
  const last = r === GUESSES.length - 1
  ;[...word].forEach((_, i) => {
    STEPS.push([TYPE_MS, (s) => ({ ...s, typed: s.typed.map((t, j) => (j === r ? word.slice(0, i + 1) : t)) })])
  })
  STEPS.push([450, (s) => ({ ...s, submitted: r + 1 })])
  STEPS.push([FLIP_STAGGER_MS * 4 + FLIP_MS + 50, (s) => ({ ...s, kb: r + 1, win: last, toast: last })])
  if (!last) STEPS.push([350, (s) => s])
})
STEPS.push([1500, (s) => ({ ...s, toast: false })])
STEPS.push([250, (s) => ({ ...s, modal: true })])
STEPS.push([5600, (s) => ({ ...s, modal: false, fading: true })])
STEPS.push([450, () => START])

const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z" />
  </svg>
)

const Backspace = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
  </svg>
)

// Wordle Definition cover: a game of Wordle is typed and solved (SNAFU), then
// the win card shows the word's definition right in the game.
// `bare` drops the yellow backdrop and frames just the game card.
export default function WordleHero({ alt = '', scale = 1, align = 'center', bare = false, className = '' }) {
  const ref = useRef(null)
  const { fit, visible } = useStageFit(ref, bare ? CARD_W : STAGE_W, bare ? CARD_H : STAGE_H, { scale, align })
  const [s, setS] = useState(START)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setS(FINAL)
      return
    }
    if (!visible) {
      setS(START)
      return
    }
    let i = 0
    let timer
    const next = () => {
      const [wait, update] = STEPS[i]
      timer = setTimeout(() => {
        setS(update)
        i = (i + 1) % STEPS.length
        next()
      }, wait)
    }
    next()
    return () => clearTimeout(timer)
  }, [visible])

  const keyStatus = {}
  for (let r = 0; r < s.kb; r++) {
    ;[...GUESSES[r]].forEach((ch, i) => {
      const st = SCORES[r][i]
      if (!keyStatus[ch] || RANK[st] > RANK[keyStatus[ch]]) keyStatus[ch] = st
    })
  }

  return (
    <div
      ref={ref}
      className={['img-slot', 'img-slot--rounded', 'wordle-hero', bare ? 'wordle-hero--bare' : '', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={alt}
    >
      <div className="wh" style={{ transform: fit || undefined, visibility: fit ? 'visible' : 'hidden' }} aria-hidden="true">
        {!bare && <img className="wh__tiles" src="/images/work/wordle/tiles.webp" alt="" />}

        <div className="wh__card">
          <div className={`wh__game${s.fading ? ' wh__game--fading' : ''}`}>
            <div className={`wh__toast${s.toast ? ' wh__toast--on' : ''}`}>Splendid</div>

            <div className="wh__board">
              {Array.from({ length: ROWS }, (_, r) => (
                <div className="wh__row" key={r}>
                  {Array.from({ length: 5 }, (_, i) => {
                    const letter = s.typed[r][i] || ''
                    const revealed = r < s.submitted
                    const bounce = s.win && r === GUESSES.length - 1
                    return (
                      <div
                        className={`wh__cell${bounce ? ' wh__cell--win' : ''}`}
                        style={bounce ? { animationDelay: `${i * 100}ms` } : undefined}
                        key={i}
                      >
                        <div
                          className={[
                            'wh__tile',
                            letter ? 'wh__tile--filled' : '',
                            revealed ? `wh__tile--flip wh__tile--${SCORES[r][i]}` : '',
                            r < PRESOLVED ? 'wh__tile--still' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          style={revealed ? { animationDelay: `${i * FLIP_STAGGER_MS}ms` } : undefined}
                        >
                          {letter}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="wh__keyboard">
              {KEYS.map((row, r) => (
                <div className="wh__keys" key={r}>
                  {[...row].map((k) => (
                    <span
                      key={k}
                      className={[
                        'wh__key',
                        k.length > 1 ? 'wh__key--wide' : '',
                        keyStatus[k] ? `wh__key--${keyStatus[k]}` : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {k === 'DEL' ? <Backspace /> : k}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={`wh__modal${s.modal ? ' wh__modal--on' : ''}`}>
            <span className="wh__close">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="wh__badge">
              <span className="wh__badge-inner">
                <Star />
              </span>
            </span>
            <p className="wh__congrats">Congratulations!</p>
            <hr className="wh__rule" />
            <div className="wh__entry">
              <p>
                <span className="wh__word">SNA·FU</span>
                <span className="wh__pos">noun</span>
              </p>
              <p className="wh__pron">/snaˈfo͞o/</p>
              <p className="wh__def">
                a confused or <u>chaotic</u> state; a mess
              </p>
            </div>
            <hr className="wh__rule" />
            <p className="wh__cta">
              Want to start tracking your
              <br />
              stats and streaks?
            </p>
            <span className="wh__account">Create a free account</span>
            <span className="wh__login">Already Registered? Log In</span>
          </div>
        </div>
      </div>
    </div>
  )
}
