'use client'

import { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'
import { createClient } from '@/infrastructure/supabase/client'
import { Plus, Users, Shield, Mail, Trash2, Edit } from 'lucide-react'

export default function GestaoUsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function checkAdminAndLoad() {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      if (user.email === 'renato086@gmail.com') {
        setIsAdmin(true)
        // Carregar Todos os Usuarios
        const { data: perfis } = await supabase
          .from('perfis')
          .select('*')
          .order('nome', { ascending: true })

        setUsuarios(perfis || [])
      }
      setLoading(false)
    }
    checkAdminAndLoad()
  }, [])

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover o acesso deste usuário?")) return
    
    // Deletar da tabela perfis (o auth.users precisa de edge function)
    const { error } = await supabase
      .from('perfis')
      .delete()
      .eq('id', id)

    if (!error) {
      setUsuarios(usuarios.filter(u => u.id !== id))
    } else {
      alert("Erro ao remover usuário.")
    }
  }

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Validando acessos...</div>

  if (!isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#EF4444' }}>
        <Shield size={40} style={{ marginBottom: '1rem', opacity: 0.8 }} />
        <h2>Acesso Restrito</h2>
        <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Apenas administradores podem gerenciar usuários.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.025em' }}>Gestão de Usuários</h1>
          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Gerencie as contas e permissões que acessam o sistema.</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#C8F542', color: '#0A0C0F', padding: '0.7rem 1.2rem', borderRadius: '10px', fontWeight: '800', fontSize: '0.85rem', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(200, 245, 66, 0.2)' }}>
          <Plus size={18} /> Cadastrar Usuário
        </button>
      </div>

      {/* 2. TABELA DE USUÁRIOS */}
      <div style={{ background: '#111318', border: '1px solid #1F242D', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1F242D' }}>
              <th style={{ padding: '0.85rem', color: '#8A8F99', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nome</th>
              <th style={{ padding: '0.85rem', color: '#8A8F99', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>E-mail</th>
              <th style={{ padding: '0.85rem', color: '#8A8F99', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setor / Cargo</th>
              <th style={{ padding: '0.85rem', color: '#8A8F99', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u: any, idx: number) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                <td style={{ padding: '0.85rem', fontWeight: 700, color: '#F4F2ED' }}>{u.nome}</td>
                <td style={{ padding: '0.85rem', color: '#8A8F99', fontSize: '0.85rem' }}>{u.email || '-'}</td>
                <td style={{ padding: '0.85rem' }}>
                  <span style={{ background: '#1F242D', color: '#F4F2ED', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {u.setor || 'Geral'}
                  </span>
                </td>
                <td style={{ padding: '0.85rem', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button style={{ color: '#8A8F99', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Editar">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(u.id)} 
                    style={{ color: '#EF4444', background: 'transparent', border: 'none', cursor: 'pointer' }} 
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
