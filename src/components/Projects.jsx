import React, { useState } from 'react'

const cardStyle = {
  background: 'var(--color-bg)',
  padding: '1.25rem',
  position: 'relative',
}

const iconButtonStyle = {
  fontSize: '11px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
}

export default function Projects({ projects, isAdmin, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', tags: '', link: '' })

  const startEdit = (project) => {
    setEditingId(project.id)
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      tags: project.tags || '',
      link: project.link || '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ title: '', description: '', tags: '', link: '' })
  }

  const saveEdit = async (id) => {
    if (!editForm.title.trim() || !onUpdate) return
    await onUpdate(id, {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      tags: editForm.tags.trim(),
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
    <div className="section" id="work">
      <p className="section-label">Selected work</p>

      {projects.length === 0 ? (
        <div className="empty-state">
          Belum ada proyek. Tambahkan lewat panel admin.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--color-border)',
          border: '0.5px solid var(--color-border)',
        }}>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ ...cardStyle, background: 'var(--color-bg)' }}>
              {isAdmin && editingId === proj.id ? (
                <div>
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Nama proyek"
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    value={editForm.tags}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="Tags (React, Node.js, ...)"
                    style={{ marginBottom: '8px' }}
                  />
                  <input
                    value={editForm.link}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, link: e.target.value }))}
                    placeholder="Link proyek / GitHub"
                    style={{ marginBottom: '8px' }}
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Deskripsi proyek"
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn" onClick={() => saveEdit(proj.id)}>Simpan</button>
                    <button className="btn btn-ghost" onClick={cancelEdit}>Batal</button>
                  </div>
                </div>
              ) : (
                <>
                  {isAdmin && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                      <button
                        style={{ ...iconButtonStyle, color: 'var(--color-muted)' }}
                        onClick={() => startEdit(proj)}
                      >
                        edit
                      </button>
                      <button className="danger" onClick={() => onDelete(proj.id)}>
                        hapus
                      </button>
                    </div>
                  )}
                  <p style={{
                    fontSize: '10px',
                    color: 'var(--color-hint)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.6rem',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500 }}>
                      {proj.title}
                    </p>
                    {proj.link && (
                      <a
                        href={normalizeLink(proj.link)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '11px',
                          color: 'var(--color-text)',
                          textDecoration: 'underline',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        See More
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--color-muted)',
                      lineHeight: 1.6,
                      marginBottom: '0.75rem',
                    }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.tags && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {proj.tags.split(',').map((tag) => (
                        <span key={tag} className="tag">{tag.trim()}</span>
                      ))}
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
