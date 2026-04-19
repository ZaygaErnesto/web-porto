import React from 'react'

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.85rem 0',
  borderBottom: '0.5px solid var(--color-border)',
}

export default function Contact({ info }) {
  const contacts = [
    { label: 'Email', value: info?.email, href: `mailto:${info?.email}` },
    { label: 'GitHub', value: info?.github, href: `https://${info?.github}` },
    { label: 'LinkedIn', value: info?.linkedin, href: `https://${info?.linkedin}` },
    { label: 'Location', value: 'Indonesia', href: null },
  ]

  return (
    <div className="section" id="contact">
      <p className="section-label">Contact</p>
      <div style={{ borderTop: '0.5px solid var(--color-border)' }}>
        {contacts.map((c) => (
          c.value && (
            <div key={c.label} style={rowStyle}>
              <span style={{
                fontSize: '10px',
                color: 'var(--color-hint)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>
                {c.label}
              </span>
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-muted)',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                  {c.value}
                </span>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  )
}
