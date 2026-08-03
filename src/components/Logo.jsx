import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Elizabeth Mazuca — home">
      <img src="/images/work/bluehappyD.gif" alt="" className="logo__mark" />
    </Link>
  )
}
