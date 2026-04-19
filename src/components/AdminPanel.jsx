import React, { useState, useEffect } from 'react'

const panelStyle = {
  background: 'var(--color-surface)',
  border: '0.5px solid var(--color-border)',
  borderRadius: '8px',
  padding: '1.25rem',
  marginBottom: '2.5rem',
}

const tabStyle = (active) => ({
  flex: 1,
  padding: '7px 4px',
  fontSize: '10px',
  background: active ? 'var(--color-bg)' : 'transparent',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: active ? 'var(--color-text)' : 'var(--color-hint)',
  fontWeight: active ? 500 : 400,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: 'all 0.15s',
})

const row2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }
const mb8 = { marginBottom: '8px' }

export default function AdminPanel({ onAddAchievement, onAddProject, onAddSkill, onAddExperience, onSaveInfo, info }) {
  const [tab, setTab] = useState('hero')

  const [achForm, setAchForm] = useState({ year: '', title: '', description: '', link: '' })
  const [projForm, setProjForm] = useState({ title: '', description: '', tags: '', link: '' })
  const [skillForm, setSkillForm] = useState({ name: '', category: '' })
  const [expForm, setExpForm] = useState({ period: '', role: '', company: '', location: '', description: '' })
  const [infoForm, setInfoForm] = useState({
    site_name: '', role: '', bio: '', email: '', github: '', linkedin: '',
  })

  useEffect(() => {
    if (info) {
      setInfoForm({
        site_name: info.site_name || '',
        role: info.role || '',
        bio: info.bio || '',
        email: info.email || '',
        github: info.github || '',
        linkedin: info.linkedin || '',
      })
    }
  }, [info])

  const submitAch = () => {
    if (!achForm.title.trim()) return
    onAddAchievement({ ...achForm, year: achForm.year || String(new Date().getFullYear()) })
    setAchForm({ year: '', title: '', description: '', link: '' })
  }

  const submitProj = () => {
    if (!projForm.title.trim()) return
    onAddProject(projForm)
    setProjForm({ title: '', description: '', tags: '', link: '' })
  }

  const submitSkill = () => {
    if (!skillForm.name.trim()) return
    onAddSkill(skillForm)
    setSkillForm({ name: '', category: '' })
  }

  const submitExp = () => {
    if (!expForm.role.trim()) return
    onAddExperience(expForm)
    setExpForm({ period: '', role: '', company: '', location: '', description: '' })
  }

  const tabs = [
    { id: 'hero', label: 'Hero' },
    { id: 'ach', label: 'Pencapaian' },
    { id: 'proj', label: 'Proyek' },
    { id: 'skill', label: 'Skills' },
    { id: 'exp', label: 'Experience' },
    { id: 'contact', label: 'Kontak' },
  ]

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Panel Admin
        </span>
        <span style={{ fontSize: '10px', color: 'var(--color-hint)' }}>
          Tersimpan ke Supabase
        </span>
      </div>

      <div style={{
        display: 'flex',
        background: 'var(--color-border)',
        borderRadius: '5px',
        padding: '2px',
        gap: '2px',
        marginBottom: '1.25rem',
      }}>
        {tabs.map(t => (
          <button key={t.id} style={tabStyle(tab === t.id)} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hero' && (
        <div>
          <div style={row2}>
            <input placeholder="Nama website" value={infoForm.site_name}
              onChange={e => setInfoForm(p => ({ ...p, site_name: e.target.value }))} />
            <input placeholder="Peran / profesi" value={infoForm.role}
              onChange={e => setInfoForm(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div style={mb8}>
            <textarea placeholder="Bio / deskripsi diri" value={infoForm.bio}
              onChange={e => setInfoForm(p => ({ ...p, bio: e.target.value }))} />
          </div>
          <button className="btn" onClick={() => onSaveInfo(infoForm)}>Simpan Hero</button>
        </div>
      )}

      {tab === 'ach' && (
        <div>
          <div style={row2}>
            <input placeholder="Tahun (2024)" maxLength={4} value={achForm.year}
              onChange={e => setAchForm(p => ({ ...p, year: e.target.value }))} />
            <input placeholder="Judul pencapaian *" value={achForm.title}
              onChange={e => setAchForm(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div style={mb8}>
            <input placeholder="Deskripsi singkat" value={achForm.description}
              onChange={e => setAchForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div style={mb8}>
            <input placeholder="Link pencapaian (opsional)" value={achForm.link}
              onChange={e => setAchForm(p => ({ ...p, link: e.target.value }))} />
          </div>
          <button className="btn" onClick={submitAch}>+ Tambah pencapaian</button>
        </div>
      )}

      {tab === 'proj' && (
        <div>
          <div style={row2}>
            <input placeholder="Nama proyek *" value={projForm.title}
              onChange={e => setProjForm(p => ({ ...p, title: e.target.value }))} />
            <input placeholder="Tags (React, Node.js, ...)" value={projForm.tags}
              onChange={e => setProjForm(p => ({ ...p, tags: e.target.value }))} />
          </div>
          <div style={mb8}>
            <input placeholder="Deskripsi proyek" value={projForm.description}
              onChange={e => setProjForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div style={mb8}>
            <input placeholder="Link proyek / GitHub (opsional)" value={projForm.link}
              onChange={e => setProjForm(p => ({ ...p, link: e.target.value }))} />
          </div>
          <button className="btn" onClick={submitProj}>+ Tambah proyek</button>
        </div>
      )}

      {tab === 'skill' && (
        <div>
          <div style={row2}>
            <input placeholder="Nama skill *" value={skillForm.name}
              onChange={e => setSkillForm(p => ({ ...p, name: e.target.value }))} />
            <input placeholder="Kategori (Frontend, ...)" value={skillForm.category}
              onChange={e => setSkillForm(p => ({ ...p, category: e.target.value }))} />
          </div>
          <button className="btn" onClick={submitSkill}>+ Tambah skill</button>
        </div>
      )}

      {tab === 'exp' && (
        <div>
          <div style={row2}>
            <input placeholder="Periode (2022 - 2024)" value={expForm.period}
              onChange={e => setExpForm(p => ({ ...p, period: e.target.value }))} />
            <input placeholder="Role / posisi *" value={expForm.role}
              onChange={e => setExpForm(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div style={row2}>
            <input placeholder="Perusahaan" value={expForm.company}
              onChange={e => setExpForm(p => ({ ...p, company: e.target.value }))} />
            <input placeholder="Lokasi" value={expForm.location}
              onChange={e => setExpForm(p => ({ ...p, location: e.target.value }))} />
          </div>
          <div style={mb8}>
            <textarea placeholder="Deskripsi pengalaman" value={expForm.description}
              onChange={e => setExpForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <button className="btn" onClick={submitExp}>+ Tambah experience</button>
        </div>
      )}

      {tab === 'contact' && (
        <div>
          <div style={row2}>
            <input placeholder="Email" value={infoForm.email}
              onChange={e => setInfoForm(p => ({ ...p, email: e.target.value }))} />
            <input placeholder="GitHub (tanpa https://)" value={infoForm.github}
              onChange={e => setInfoForm(p => ({ ...p, github: e.target.value }))} />
          </div>
          <div style={mb8}>
            <input placeholder="LinkedIn (tanpa https://)" value={infoForm.linkedin}
              onChange={e => setInfoForm(p => ({ ...p, linkedin: e.target.value }))} />
          </div>
          <button className="btn" onClick={() => onSaveInfo(infoForm)}>Simpan kontak</button>
        </div>
      )}
    </div>
  )
}
