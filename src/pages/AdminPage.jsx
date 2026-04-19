import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminPanel from '../components/AdminPanel'
import Achievements from '../components/Achievements'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Experience from '../components/Experience'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

const centerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  fontFamily: 'var(--font-mono)',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [info, setInfo] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError('')
      fetchAll()
    } else {
      setError('Password salah.')
      setPassword('')
    }
  }

  async function fetchAll() {
    setLoading(true)
    const [infoRes, achRes, projRes, skillRes, expRes] = await Promise.all([
      supabase.from('site_info').select('*').single(),
      supabase.from('achievements').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: true }),
      supabase.from('skills').select('*').order('created_at', { ascending: true }),
      supabase.from('experiences').select('*').order('created_at', { ascending: false }),
    ])
    if (infoRes.data) setInfo(infoRes.data)
    if (achRes.data) setAchievements(achRes.data)
    if (projRes.data) setProjects(projRes.data)
    if (skillRes.data) setSkills(skillRes.data)
    if (expRes.data) setExperiences(expRes.data)
    setLoading(false)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  async function addAchievement(form) {
    const { data, error } = await supabase.from('achievements')
      .insert([{ year: form.year, title: form.title, description: form.description, link: form.link }]).select()
    if (!error && data) { setAchievements(prev => [data[0], ...prev]); showToast('Pencapaian ditambahkan.') }
  }

  async function deleteAchievement(id) {
    const { error } = await supabase.from('achievements').delete().eq('id', id)
    if (!error) { setAchievements(prev => prev.filter(a => a.id !== id)); showToast('Pencapaian dihapus.') }
  }

  async function updateAchievement(id, form) {
    const { data, error } = await supabase.from('achievements')
      .update({ year: form.year, title: form.title, description: form.description, link: form.link })
      .eq('id', id)
      .select()
    if (!error && data) {
      setAchievements(prev => prev.map(a => (a.id === id ? data[0] : a)))
      showToast('Pencapaian diperbarui.')
    }
  }

  async function addProject(form) {
    const { data, error } = await supabase.from('projects')
      .insert([{ title: form.title, description: form.description, tags: form.tags, link: form.link }]).select()
    if (!error && data) { setProjects(prev => [...prev, data[0]]); showToast('Proyek ditambahkan.') }
  }

  async function deleteProject(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (!error) { setProjects(prev => prev.filter(p => p.id !== id)); showToast('Proyek dihapus.') }
  }

  async function updateProject(id, form) {
    const { data, error } = await supabase.from('projects')
      .update({ title: form.title, description: form.description, tags: form.tags, link: form.link })
      .eq('id', id)
      .select()
    if (!error && data) {
      setProjects(prev => prev.map(p => (p.id === id ? data[0] : p)))
      showToast('Proyek diperbarui.')
    }
  }

  async function addSkill(form) {
    const { data, error } = await supabase.from('skills')
      .insert([{ name: form.name, category: form.category }]).select()
    if (!error && data) {
      setSkills(prev => [...prev, data[0]])
      showToast('Skill ditambahkan.')
      return
    }
    showToast(error?.message || 'Gagal menambah skill.')
  }

  async function deleteSkill(id) {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (!error) { setSkills(prev => prev.filter(s => s.id !== id)); showToast('Skill dihapus.') }
  }

  async function addExperience(form) {
    const { data, error } = await supabase.from('experiences')
      .insert([{
        period: form.period,
        role: form.role,
        company: form.company,
        location: form.location,
        description: form.description,
      }]).select()
    if (!error && data) {
      setExperiences(prev => [data[0], ...prev])
      showToast('Experience ditambahkan.')
      return
    }
    showToast(error?.message || 'Gagal menambah experience.')
  }

  async function deleteExperience(id) {
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (!error) { setExperiences(prev => prev.filter(e => e.id !== id)); showToast('Experience dihapus.') }
  }

  async function updateExperience(id, form) {
    const { data, error } = await supabase.from('experiences')
      .update({
        period: form.period,
        role: form.role,
        company: form.company,
        location: form.location,
        description: form.description,
      })
      .eq('id', id)
      .select()
    if (!error && data) {
      setExperiences(prev => prev.map(e => (e.id === id ? data[0] : e)))
      showToast('Experience diperbarui.')
      return
    }
    showToast(error?.message || 'Gagal memperbarui experience.')
  }

  async function saveInfo(form) {
    const { data, error } = await supabase.from('site_info')
      .update({
        site_name: form.site_name, role: form.role, bio: form.bio,
        email: form.email, github: form.github, linkedin: form.linkedin,
      })
      .eq('id', info.id).select()
    if (!error && data) { setInfo(data[0]); showToast('Informasi disimpan.') }
  }

  if (!authed) {
    return (
      <div style={centerStyle}>
        <div style={{
          width: '100%', maxWidth: '340px', padding: '2rem',
          border: '0.5px solid var(--color-border)', borderRadius: '8px',
        }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-hint)', marginBottom: '1.5rem',
          }}>Admin Access</p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)} autoFocus
              style={{ marginBottom: '10px' }} />
            {error && <p style={{ fontSize: '12px', color: '#c0392b', marginBottom: '10px' }}>{error}</p>}
            <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
              Masuk
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ ...centerStyle, fontSize: '12px', color: 'var(--color-hint)' }}>Loading...</div>
  }

  return (
    <div className="container" style={{ paddingBottom: '4rem', paddingTop: '2rem' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: 'var(--color-text)', color: 'var(--color-bg)',
          padding: '10px 18px', borderRadius: '6px', fontSize: '12px',
          fontFamily: 'var(--font-mono)', zIndex: 999,
        }}>
          {toast}
        </div>
      )}

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '0.5px solid var(--color-border)',
      }}>
        <span style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
          Admin Panel
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '11px', color: 'var(--color-hint)' }}>← Lihat website</a>
          <button className="btn btn-ghost" onClick={() => setAuthed(false)} style={{ fontSize: '11px' }}>
            Keluar
          </button>
        </div>
      </div>

      <AdminPanel
        info={info}
        onAddAchievement={addAchievement}
        onAddProject={addProject}
        onAddSkill={addSkill}
        onAddExperience={addExperience}
        onSaveInfo={saveInfo}
      />

      <Skills skills={skills} isAdmin={true} onDelete={deleteSkill} />
      <Experience
        experiences={experiences}
        isAdmin={true}
        onDelete={deleteExperience}
        onUpdate={updateExperience}
      />
      <Achievements
        achievements={achievements}
        isAdmin={true}
        onDelete={deleteAchievement}
        onUpdate={updateAchievement}
      />
      <Projects
        projects={projects}
        isAdmin={true}
        onDelete={deleteProject}
        onUpdate={updateProject}
      />
    </div>
  )
}
