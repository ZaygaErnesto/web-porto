import React, { useState } from 'react'

const itemStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
  padding: '1rem 0',
  borderBottom: '0.5px solid var(--color-border)',
}

const actionButtonStyle = {
  fontSize: '11px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
}

export default function Achievements({ achievements, isAdmin, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ year: '', title: '', description: '', link: '' })

  const startEdit = (ach) => {
    setEditingId(ach.id)
    setEditForm({
      year: ach.year || '',
      title: ach.title || '',
      description: ach.description || '',
      link: ach.link || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ year: '', title: '', description: '', link: '' })
  }

  const saveEdit = async (id) => {
    if (!editForm.title.trim() || !onUpdate) return
    await onUpdate(id, {
      year: editForm.year || String(new Date().getFullYear()),
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      link: editForm.link.trim(),
    })
    cancelEdit()
  }

  const normalizeLink = (value) => {
    if (!value) return ''
    if (value.startsWith('http://') || value.startsWith('https://')) return value
    return `https://${value}`
  }

  return (
    <div className="section" id="achievements">
      <p className="section-label">Pencapaian</p>

      {achievements.length === 0 ? (
        <div className="empty-state">
          Belum ada pencapaian. Tambahkan lewat panel admin.
        </div>
      ) : (
        <div style={{ borderTop: '0.5px solid var(--color-border)' }}>
          {achievements.map((ach) => (
            <div key={ach.id} style={itemStyle}>
              {isAdmin && editingId === ach.id ? (
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input
                      maxLength={4}
                      value={editForm.year}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, year: e.target.value }))}
                      placeholder="Tahun"
                    />
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Judul pencapaian"
                    />
                  </div>
                  <input
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Deskripsi"
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    value={editForm.link}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, link: e.target.value }))}
                    placeholder="Link pencapaian"
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn" onClick={() => saveEdit(ach.id)}>Simpan</button>
                    <button className="btn btn-ghost" onClick={cancelEdit}>Batal</button>
                  </div>
                </div>
              ) : (
                <>
                  <span style={{
                    fontSize: '11px',
                    color: 'var(--color-hint)',
                    fontFamily: 'var(--font-mono)',
                    minWidth: '36px',
                    paddingTop: '2px',
                  }}>
                    {ach.year}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>
                        {ach.title}
                      </p>
                      {ach.link && (
                        <a
                          href={normalizeLink(ach.link)}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: '11px',
                            color: 'var(--color-text)',
                            textDecoration: 'underline',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          See more
                        </a>
                      )}
                    </div>
                    {ach.description && (
                      <p style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                        {ach.description}
                      </p>
                    )}
                  </div>
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{ ...actionButtonStyle, color: 'var(--color-muted)' }}
                        onClick={() => startEdit(ach)}
                      >
                        edit
                      </button>
                      <button className="danger" onClick={() => onDelete(ach.id)}>
                        hapus
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
