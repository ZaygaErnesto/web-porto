import React from 'react'

export default function Skills({ skills, isAdmin = false, onDelete }) {
  return (
    <div className="section" id="skills">
      <p className="section-label">Skills &amp; tools</p>

      {skills.length === 0 ? (
        <div className="empty-state">Belum ada skill. Tambahkan lewat panel admin.</div>
      ) : (
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.id} style={{ background: 'var(--color-bg)', padding: '0.9rem 1rem', position: 'relative' }}>
              {isAdmin && (
                <button className="danger" onClick={() => onDelete(skill.id)}
                  style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  hapus
                </button>
              )}
              <p style={{ fontSize: '13px', color: 'var(--color-text)', marginBottom: '4px' }}>
                {skill.name}
              </p>
              {skill.category && (
                <p style={{ fontSize: '10px', color: 'var(--color-hint)' }}>
                  {skill.category}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
