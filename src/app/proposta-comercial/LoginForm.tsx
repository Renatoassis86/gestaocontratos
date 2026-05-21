'use client'

import { useState, useRef, useEffect } from 'react'
import { propostaSignIn } from './actions'
import { Lock, ArrowRight } from 'lucide-react'

export function LoginForm({ initialError }: { initialError: string }) {
  const [errorMsg, setErrorMsg] = useState(initialError)
  const [empresa, setEmpresa]   = useState('')
  const [senha, setSenha]       = useState('')
  const empresaRef = useRef<HTMLInputElement>(null)

  // Limpa o ?error=... da URL ao carregar (deixa só a mensagem em memória)
  useEffect(() => {
    if (initialError && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (url.searchParams.has('error')) {
        url.searchParams.delete('error')
        window.history.replaceState({}, '', url.toString())
      }
    }
    // Foca empresa
    empresaRef.current?.focus()
  }, [initialError])

  // Quando o usuário começa a digitar, some o erro
  function clearError() {
    if (errorMsg) setErrorMsg('')
  }

  return (
    <>
      {errorMsg && (
        <div style={{
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 10,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: '0.82rem',
          color: '#FCA5A5',
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
          fontWeight: 500,
        }}>
          ⚠ {errorMsg}
        </div>
      )}

      <form
        action={propostaSignIn}
        autoComplete="off"
        data-form-type="other"
        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {/* Honeypot anti-autofill */}
        <input
          type="text" name="prevent_autofill" id="prevent_autofill"
          tabIndex={-1} autoComplete="off"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
        <input
          type="password" name="prevent_autofill_pw"
          tabIndex={-1} autoComplete="new-password"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />

        <div>
          <label htmlFor="empresa" style={labelStyle}>Empresa</label>
          <input
            ref={empresaRef}
            id="empresa" name="empresa" type="text" required
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
            data-lpignore="true" data-form-type="other" data-1p-ignore="true"
            placeholder="Nome da empresa fornecido pela ARKOS"
            value={empresa}
            onChange={e => { setEmpresa(e.target.value); clearError() }}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="senha" style={labelStyle}>Senha de acesso</label>
          <input
            id="senha" name="senha" type="password" required
            autoComplete="new-password"
            data-lpignore="true" data-1p-ignore="true"
            placeholder="••••••••"
            value={senha}
            onChange={e => { setSenha(e.target.value); clearError() }}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={submitStyle}>
          <span>Acessar Proposta</span>
          <ArrowRight size={16} />
        </button>
      </form>

      <div style={{
        marginTop: 22, paddingTop: 18,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: '0.72rem', color: 'rgba(244,242,237,0.45)',
        fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
        letterSpacing: '0.02em',
      }}>
        <Lock size={11} />
        <span>Acesso restrito · As credenciais foram enviadas pela ARKOS</span>
      </div>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.688rem', fontWeight: 700,
  color: 'rgba(244,242,237,0.55)',
  letterSpacing: '0.12em', textTransform: 'uppercase',
  marginBottom: 8,
  fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  color: '#F4F2ED',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.15s, background 0.15s',
  boxSizing: 'border-box',
  letterSpacing: '-0.005em',
}

const submitStyle: React.CSSProperties = {
  marginTop: 10,
  padding: '14px 20px',
  background: 'linear-gradient(135deg, #C8F542 0%, #A8DB1F 100%)',
  color: '#0A0C0F',
  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  fontWeight: 800,
  fontSize: '0.95rem',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(200,245,66,0.25)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  letterSpacing: '-0.01em',
}
