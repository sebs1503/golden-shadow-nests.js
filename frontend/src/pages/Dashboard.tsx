import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Card } from '../components/Card'

export default function Dashboard(){
  const [counts, setCounts] = useState<{families:number, methods:number, victims:number, cases:number} | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      api.families.list({limit: 100}), api.methods.list({limit:100}), api.victims.list({limit:100}), api.cases.list({limit:100})
    ]).then(([f, m, v, c]) => setCounts({families: f.length, methods: m.length, victims: v.length, cases: c.length}))
      .catch(e => setErr(String(e)))
  }, [])

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card title="Families">{counts ? <div className="text-3xl font-semibold">{counts.families}</div> : '...'}</Card>
      <Card title="Methods">{counts ? <div className="text-3xl font-semibold">{counts.methods}</div> : '...'}</Card>
      <Card title="Victims">{counts ? <div className="text-3xl font-semibold">{counts.victims}</div> : '...'}</Card>
      <Card title="Cases">{counts ? <div className="text-3xl font-semibold">{counts.cases}</div> : '...'}</Card>
      {err && <div className="col-span-full text-red-600">{err}</div>}
    </div>
  )
}
