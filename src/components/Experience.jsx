import React, { useState } from 'react'

const actionButtonStyle = {
  fontSize: '11px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
}

export default function Experience({ experiences = [], isAdmin = false, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ period: '', role: '', company: '', location: '', description: '' })

  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({
      period: item.period || '',
      role: item.role || '',
      company: item.company || '',
      location: item.location || '',
      description: item.description || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ period: '', role: '', company: '', location: '', description: '' })
  }

  const saveEdit = async (id) => {
    if (!editForm.role.trim() || !onUpdate) return
    await onUpdate(id, {
      period: editForm.period.trim(),
      role: editForm.role.trim(),
      company: editForm.company.trim(),
      location: editForm.location.trim(),
      description: editForm.description.trim(),
    })
    cancelEdit()
  }

  return (
    <div className="section" id="experience">
      <p className="section-label">Experience</p>

      {experiences.length === 0 ? (
        <div className="empty-state">Belum ada pengalaman yang ditambahkan.</div>
      ) : (
        <div style={{ borderTop: '0.5px solid var(--color-border)' }}>
          {experiences.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr',
                gap: '16px',
                borderBottom: '0.5px solid var(--color-border)',
                padding: '1rem 0',
              }}
            >
              {isAdmin && editingId === item.id ? (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input
                      placeholder="Periode (2022 - 2024)"
                      value={editForm.period}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, period: e.target.value }))}
                    />
                    <input
                      placeholder="Role / posisi *"
                      value={editForm.role}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value }))}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input
                      placeholder="Perusahaan"
                      value={editForm.company}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, company: e.target.value }))}
                    />
                    <input
                      placeholder="Lokasi"
                      value={editForm.location}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <textarea
                    placeholder="Deskripsi"
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn" onClick={() => saveEdit(item.id)}>Simpan</button>
                    <button className="btn btn-ghost" onClick={cancelEdit}>Batal</button>
                  </div>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-hint)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {item.period}
                  </p>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>{item.role}</p>
                      {isAdmin && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{ ...actionButtonStyle, color: 'var(--color-muted)' }}
                            onClick={() => startEdit(item)}
                          >
                            edit
                          </button>
                          <button className="danger" onClick={() => onDelete(item.id)}>
                            hapus
                          </button>
                        </div>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '6px' }}>
                      {item.company} {item.location ? `• ${item.location}` : ''}
                    </p>
                    {item.description && (
                      <p style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}