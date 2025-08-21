import { FormEvent, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { CaseFile, CaseStatus, Family, MurderMethod } from '../lib/types'
import { Card } from '../components/Card'
import { Table } from '../components/Table'

export default function CasesPage(){
  const [items, setItems] = useState<CaseFile[]>([])
  const [families, setFamilies] = useState<Family[]>([])
  const [methods, setMethods] = useState<MurderMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')
  const [populate, setPopulate] = useState(true)

  // form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [familiesPick, setFamiliesPick] = useState<string[]>([])
  const [murderMethod, setMurderMethod] = useState('')
  const [clues, setClues] = useState('')
  const [investigatorName, setInvestigatorName] = useState('')

  const load = async ()=>{
    setLoading(true)
    try { 
      const [c, f, m] = await Promise.all([
        api.cases.list({populate, ...(status? {status}: {})}),
        api.families.list({limit: 100}),
        api.methods.list({limit: 100})
      ])
      setItems(c); setFamilies(f); setMethods(m);
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [status, populate])

  const onCreate = async (e: FormEvent)=>{
    e.preventDefault()
    await api.cases.create({
      title, description: description || undefined, location: location || undefined,
      date: date || undefined, status: status || undefined,
      families: familiesPick, murderMethod: murderMethod || undefined,
      clues: clues? clues.split(',').map(s=>s.trim()).filter(Boolean) : undefined,
      investigatorName: investigatorName || undefined
    })
    setTitle(''); setDescription(''); setLocation(''); setDate(''); setFamiliesPick([]); setMurderMethod(''); setClues(''); setInvestigatorName('')
    await load()
  }
  const onDelete = async (id: string)=>{
    if (!confirm('Delete case?')) return
    await api.cases.remove(id)
    await load()
  }
  const toggleFamily = (id: string)=>{
    setFamiliesPick(prev => prev.includes(id)? prev.filter(x=>x!==id) : [...prev, id])
  }

  const headers = useMemo(()=> ['Title','Status','Families','Method','Clues','Actions'], [])
  const rows = items.map(c => [
    <b key="t">{c.title}</b>,
    c.status,
    Array.isArray(c.families) ? c.families.map((f:any)=> typeof f==='string'? f : f?.name).join(', ') : '—',
    typeof c.murderMethod === 'string'? c.murderMethod : c.murderMethod?.name || '—',
    (c.clues||[]).join(', '),
    <div key="a" className="flex gap-2">
      <button onClick={()=>onDelete(c._id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
    </div>
  ])

  return (
    <div className="grid gap-4">
      <Card title="Cases" actions={
        <div className="flex items-center gap-2">
          <select className="border rounded p-2 text-sm" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="INVESTIGATING">INVESTIGATING</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={populate} onChange={e=>setPopulate(e.target.checked)} />
            populate
          </label>
        </div>
      }>
        {loading? 'Loading...' : <Table headers={headers} rows={rows} />}
      </Card>

      <Card title="Create case">
        <form onSubmit={onCreate} className="grid md:grid-cols-2 gap-2">
          <input className="border rounded p-2" placeholder="Title *" value={title} onChange={e=>setTitle(e.target.value)} required />
          <select className="border rounded p-2" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">Status (optional)</option>
            <option value="OPEN">OPEN</option>
            <option value="INVESTIGATING">INVESTIGATING</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <input className="border rounded p-2" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
          <input type="date" className="border rounded p-2" value={date} onChange={e=>setDate(e.target.value)} />
          <textarea className="border rounded p-2 md:col-span-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          
          <div className="md:col-span-2">
            <div className="font-medium mb-1">Families</div>
            <div className="flex flex-wrap gap-2">
              {families.map(f=>(
                <label key={f._id} className={"px-3 py-1 rounded-full border cursor-pointer " + (familiesPick.includes(f._id)? "bg-zinc-900 text-white" : "bg-white")}>
                  <input type="checkbox" className="hidden" checked={familiesPick.includes(f._id)} onChange={()=>toggleFamily(f._id)} />
                  {f.name}
                </label>
              ))}
            </div>
          </div>

          <select className="border rounded p-2 md:col-span-2" value={murderMethod} onChange={e=>setMurderMethod(e.target.value)}>
            <option value="">Murder method (optional)</option>
            {methods.map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
          </select>

          <input className="border rounded p-2 md:col-span-2" placeholder="Clues (comma separated)" value={clues} onChange={e=>setClues(e.target.value)} />
          <input className="border rounded p-2 md:col-span-2" placeholder="Investigator name" value={investigatorName} onChange={e=>setInvestigatorName(e.target.value)} />

          <button className="mt-2 bg-zinc-900 text-white rounded py-2 md:col-span-2">Create</button>
        </form>
      </Card>
    </div>
  )
}
