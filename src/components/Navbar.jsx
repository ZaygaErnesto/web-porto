import React, { useState } from 'react'

export default function Navbar({ siteName }) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => setOpen(false)

  return (
    <nav className="navbar">
      <span className="navbar__name">{siteName || 'DEV.PORTO'}</span>

      <button
        className={`navbar__hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar__links${open ? ' open' : ''}`}>
        <a href="#work" className="navbar__link" onClick={handleLinkClick}>Work</a>
        <a href="#experience" className="navbar__link" onClick={handleLinkClick}>Experience</a>
        <a href="#achievements" className="navbar__link" onClick={handleLinkClick}>Achievements</a>
        <a href="#contact" className="navbar__link" onClick={handleLinkClick}>Contact</a>
      </div>
    </nav>
  )
}
