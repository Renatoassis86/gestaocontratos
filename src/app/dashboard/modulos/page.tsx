import Link from 'next/link'
import { FileText, Users, ShoppingCart, LogOut, Package } from 'lucide-react'

export default function ModulosSelector() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header Selector */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black text-blue-600">ARKOS</span>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-sm text-slate-500">Selecione o Módulo</span>
        </div>
        
        <Link href="/login">
          <button className="flex items-center space-x-1.5 text-sm text-slate-600 hover:text-red-500 font-medium transition-all">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </Link>
      </header>

      {/* Main Container Grid */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Bem-vindo ao Arkos Suite</h1>
          <p className="text-slate-500 max-w-sm mx-auto">
            Escolha qual módulo de gestão você deseja operar agora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {/* Módulo 1: Gestão de Contratos (Internal) */}
          <Link href="/dashboard/documentos" className="flex">
            <div className="bg-white hover:bg-slate-900 group flex-1 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer transition-all flex flex-col border-t-4 border-t-emerald-500">
              <div className="w-12 h-12 bg-emerald-50 group-hover:bg-emerald-600 transition-all rounded-xl flex items-center justify-center text-emerald-600 group-hover:text-white mb-6">
                <FileText size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2">Gestão de Contratos</h2>
              <p className="text-slate-500 group-hover:text-slate-400 text-xs mb-6 flex-1">
                Controle de emissão, histórico acadêmico, certificados e CLM corporativo.
              </p>
              <div className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-400 flex items-center space-x-1">
                <span>Acessar</span>
                <span>➔</span>
              </div>
            </div>
          </Link>

          {/* Módulo 2: Gestão Comercial (External) */}
          <a href="https://comercial.cidadeviva.education" target="_blank" rel="noopener noreferrer" className="flex">
            <div className="bg-white hover:bg-slate-900 group flex-1 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer transition-all flex flex-col border-t-4 border-t-blue-500">
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 transition-all rounded-xl flex items-center justify-center text-blue-600 group-hover:text-white mb-6">
                <ShoppingCart size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2">Gestão Comercial</h2>
              <p className="text-slate-500 group-hover:text-slate-400 text-xs mb-6 flex-1">
                Otimize funil de vendas, propostas comerciais e conversões em tempo real.
              </p>
              <div className="text-sm font-semibold text-blue-600 group-hover:text-blue-400 flex items-center space-x-1">
                <span>Acessar</span>
                <span>➔</span>
              </div>
            </div>
          </a>

          {/* Módulo 3: Recrutamento (External) */}
          <a href="https://recrutamento.cidadeviva.education/" target="_blank" rel="noopener noreferrer" className="flex">
            <div className="bg-white hover:bg-slate-900 group flex-1 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer transition-all flex flex-col border-t-4 border-t-violet-500">
              <div className="w-12 h-12 bg-violet-50 group-hover:bg-violet-600 transition-all rounded-xl flex items-center justify-center text-violet-600 group-hover:text-white mb-6">
                <Users size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2">Recrutamento</h2>
              <p className="text-slate-500 group-hover:text-slate-400 text-xs mb-6 flex-1">
                Triagem inteligente de candidatos e Onboarding digital sem burocracia.
              </p>
              <div className="text-sm font-semibold text-violet-600 group-hover:text-violet-400 flex items-center space-x-1">
                <span>Acessar</span>
                <span>➔</span>
              </div>
            </div>
          </a>

          {/* Módulo 4: Gestão de Pedidos (External) */}
          <a href="https://appgestaocontratos.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex">
            <div className="bg-white hover:bg-slate-900 group flex-1 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer transition-all flex flex-col border-t-4 border-t-cyan-500">
              <div className="w-12 h-12 bg-cyan-50 group-hover:bg-cyan-600 transition-all rounded-xl flex items-center justify-center text-cyan-600 group-hover:text-white mb-6">
                <Package size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2">Pedidos e Ocorrências</h2>
              <p className="text-slate-500 group-hover:text-slate-400 text-xs mb-6 flex-1">
                Controle de requisições, chamados internos e fluxos de atendimento.
              </p>
              <div className="text-sm font-semibold text-cyan-600 group-hover:text-cyan-400 flex items-center space-x-1">
                <span>Acessar</span>
                <span>➔</span>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}
