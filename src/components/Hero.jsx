import React from 'react'

export default function Hero({ info }) {
  return (
    <div style={{ marginBottom: '4rem' }}>
      <p style={{
        fontSize: '11px',
        color: 'var(--color-hint)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
        fontFamily: 'var(--font-mono)',
      }}>
        {info?.role || 'Software Developer — Indonesia'}
      </p>

      <h1 className="hero-title">
        Building things<br />
        <span style={{ color: 'var(--color-hint)' }}>for the web.</span>
      </h1>

      <p style={{
        fontSize: '14px',
        color: 'var(--color-muted)',
        lineHeight: 1.8,
        maxWidth: '480px',
        marginBottom: '2rem',
      }}>
        {info?.bio || 'Saya seorang developer yang fokus pada pengembangan aplikasi yang bersih, efisien, dan berpusat pada pengguna.'}
      </p>

      <div className="hero-actions">
        <a href={`mailto:${info?.email}`} className="btn">
          Contact Me
        </a>
        <a
          href={`https://${info?.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          GitHub →
        </a>
      </div>
    </div>
  )
}
