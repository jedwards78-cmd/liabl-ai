'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  minorName:     string
  onNext:        (v: { guardianName: string; guardianSig: string }) => void
  onBack:        () => void
}

export default function StepGuardian({ minorName, onNext, onBack }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const drawing    = useRef(false)
  const [guardian, setGuardian] = useState('')
  const [relation, setRelation] = useState('Parent')
  const [hasSig,   setHasSig]   = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio || 1)
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)

    function pos(e: MouseEvent | TouchEvent) {
      const rect = canvas!.getBoundingClientRect()
      const src  = 'touches' in e ? e.touches[0] : e
      return { x: src.clientX - rect.left, y: src.clientY - rect.top }
    }
    function start(e: MouseEvent | TouchEvent) {
      drawing.current = true
      const { x, y } = pos(e); ctx.beginPath(); ctx.moveTo(x, y)
    }
    function move(e: MouseEvent | TouchEvent) {
      if (!drawing.current) return; e.preventDefault()
      const { x, y } = pos(e)
      ctx.lineTo(x, y); ctx.strokeStyle = '#4B2ACF'
      ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke()
      setHasSig(true)
    }
    function end() { drawing.current = false }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', end)
    canvas.addEventListener('mouseleave', end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove',  move,  { passive: false })
    canvas.addEventListener('touchend', end)
    return () => {
      canvas.removeEventListener('mousedown', start)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', end)
      canvas.removeEventListener('mouseleave', end)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove', move)
      canvas.removeEventListener('touchend', end)
    }
  }, [])

  function clear() {
    const canvas = canvasRef.current!
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasSig(false)
  }

  function submit() {
    if (!guardian.trim() || !hasSig) return
    onNext({ guardianName: `${guardian} (${relation})`, guardianSig: canvasRef.current!.toDataURL() })
  }

  const canSubmit = guardian.trim().length > 0 && hasSig

  return (
    <div className="card">
      <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm flex gap-2 mb-5">
        <span>⚠️</span>
        <span><strong>{minorName}</strong> is a minor. A parent or legal guardian must sign this waiver.</span>
      </div>

      <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-2">Guardian authorization</p>
      <h2 className="font-serif text-2xl mb-1">Guardian signature required</h2>
      <p className="text-gray-500 text-sm mb-5 leading-relaxed">
        As parent or legal guardian, you are authorizing participation and assuming all risks on behalf of the minor.
      </p>

      <div className="space-y-4 mb-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Guardian full name</label>
          <input className="form-input" value={guardian} onChange={e => setGuardian(e.target.value)} placeholder="First Last" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Relationship to minor</label>
          <select className="form-input" value={relation} onChange={e => setRelation(e.target.value)}>
            <option>Parent</option>
            <option>Legal guardian</option>
            <option>Grandparent</option>
            <option>Other authorized adult</option>
          </select>
        </div>
      </div>

      <div className="bg-surface border border-black/10 rounded-xl p-4 text-sm text-gray-600 mb-5 leading-relaxed">
        I, <strong>{guardian || '[Guardian name]'}</strong>, confirm I am the {relation.toLowerCase()} of{' '}
        <strong>{minorName}</strong> and grant permission for them to participate in today&apos;s activity.
        I have read and agree to all terms of this liability waiver on their behalf. I understand that
        neither the minor nor their estate may bring a claim except as permitted by applicable law.
      </div>

      <label className="block text-xs font-medium text-gray-500 mb-1">Guardian signature</label>
      <div className="relative mb-1">
        <canvas
          ref={canvasRef}
          className="w-full h-20 rounded-xl border border-black/20 bg-white cursor-crosshair block"
          style={{ touchAction: 'none' }}
        />
        {!hasSig && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 pointer-events-none">
            Guardian — draw signature here
          </p>
        )}
      </div>
      {hasSig && (
        <button onClick={clear} className="text-xs text-gray-400 hover:text-gray-600 underline mb-4">Clear</button>
      )}

      <div className="bg-brand/5 border border-brand/20 text-brand rounded-xl p-3 text-xs mb-5 flex gap-2 mt-3">
        <span>🔒</span>
        <span>Guardian signature recorded at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — ESIGN Act compliant.</span>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={submit} disabled={!canSubmit} className="btn-primary">
          Submit guardian signature →
        </button>
      </div>
    </div>
  )
}
