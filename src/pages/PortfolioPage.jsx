import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Achievements from '../components/Achievements'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  fontSize: '12px',
  color: 'var(--color-hint)',
  letterSpacing: '0.08em',
  fontFamily: 'var(--font-mono)',
}

export default function PortfolioPage() {
  const [info, setInfo] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
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
    fetchAll()
  }, [])

  if (loading) return <div style={loadingStyle}>Loading...</div>

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <Navbar siteName={info?.site_name} />
      <Hero info={info} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Achievements achievements={achievements} isAdmin={false} />
      <Projects projects={projects} isAdmin={false} />
      <Contact info={info} />

      <footer style={{
        paddingTop: '2rem',
        borderTop: '0.5px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
      }}>
        <span style={{ fontSize: '10px', color: 'var(--color-hint)', fontFamily: 'var(--font-mono)' }}>
          {new Date().getFullYear()} — all rights reserved
        </span>
        <span style={{ fontSize: '10px', color: 'var(--color-hint)', fontFamily: 'var(--font-mono)' }}>
          available for freelance
        </span>
      </footer>
    </div>
  )
}
