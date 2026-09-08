import { ArrowLeft, Ticket } from 'lucide-react'

export function PageShell({ title, eyebrow, onBack, children, action }) {
  return <main className="app-page"><header className="app-page-header"><button className="auth-back" onClick={onBack}><ArrowLeft size={16} /> Back</button><div className="page-brand"><span className="brand-mark">C</span><strong>Cine<span>Pass</span></strong></div><Ticket size={20} /></header><div className="app-page-inner"><div className="page-title-row"><div><span className="section-kicker">{eyebrow}</span><h1>{title}</h1></div>{action}</div>{children}</div></main>
}

export function LoadingState() { return <div className="page-state">Loading...</div> }
export function ErrorState({ message }) { return <div className="page-state page-error">{message}</div> }
export function EmptyState({ children }) { return <div className="page-state">{children}</div> }
