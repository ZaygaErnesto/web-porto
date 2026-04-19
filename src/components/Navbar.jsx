import React from 'react'

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 0',
  borderBottom: '0.5px solid var(--color-border)',
  marginBottom: '3rem',
}

const nameStyle = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.05em',
  fontFamily: 'var(--font-mono)',
}

const linksStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
}

const linkStyle = {
  fontSize: '11px',
  color: 'var(--color-hint)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const adminBtnStyle = {
  fontSize: '10px',
  padding: '4px 12px',
  border: '0.5px solid var(--color-border-strong)',
  borderRadius: '3px',
  background: 'transparent',
  color: 'var(--color-muted)',
  cursor: 'pointer',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

export default function Navbar({ siteName }) {
  return (
    <nav style={navStyle}>
      <span style={nameStyle}>{siteName || 'DEV.PORTO'}</span>
      <div style={linksStyle}>
        <a href="#work" style={linkStyle}>Work</a>
        <a href="#experience" style={linkStyle}>Experience</a>
        <a href="#achievements" style={linkStyle}>Achievements</a>
        <a href="#contact" style={linkStyle}>Contact</a>
      </div>
    </nav>
  )
}
