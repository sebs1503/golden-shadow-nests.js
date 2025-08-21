import { FormEvent, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Victim, Family, MurderMethod, CaseFile } from '../lib/types'
import { Card } from '../components/Card'
import { Table } from '../components/Table'

export default function VictimsPage(){
  const [items, setItems] = useState<Victim[]>([])
  const [families, setFamilies] = useState<Family[]>([])
  const [methods, setMethods] = useState<MurderMethod[]>([])
  const [cases, setCases] = useState<CaseFile[]>([])
  const [loading, setLoading] = useState(false)
  const [filterFamily, setFilterFamily] = useState<string>('')

  // form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [family, setFamily] = useState('')
  const [mannerOfDeath, setMannerOfDeath] = useState('')
  const [caseId, setCaseId] = useState('')
  const [occupation, setOccupation] = useState('')
  const [details, setDetails] = useState('')
  const [dateOfDeath, setDateOfDeath] = useState('')

  const load = async ()=>{
    setLoading(true)
    try { 
      const [v, f, m, c] = await Promise.all([
        api.victims.list(filterFamily? {family: filterFamily} : undefined),
        api.families.list({limit: 100}),
        api.methods.list({limit: 100}),
        api.cases.list({limit: 100})
      ])
      setItems(v); setFamilies(f); setMethods(m); setCases(c)
    } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [filterFamily])

  const onCreate = async (e: FormEvent)=>{
    e.preventDefault()
    await api.victims.create({
      firstName, lastName, family, mannerOfDeath: mannerOfDeath || undefined, case: caseId || undefined,
      occupation: occupation || undefined, bodyDiscoveryDetails: details || undefined,
      dateOfDeath: dateOfDeath || undefined,
    })
    setFirstName(''); setLastName(''); setFamily(''); setMannerOfDeath(''); setCaseId(''); setOccupation(''); setDetails(''); setDateOfDeath('')
    await load()
  }
  const onDelete = async (id: string)=>{
    if (!confirm('Delete victim?')) return
    await api.victims.remove(id)
    await load()
  }

  return (
    <div className="grid gap-4">
      <Card title="Victims" actions={
        <select className="border rounded p-2 text-sm" value={filterFamily} onChange={e=>setFilterFamily(e.target.value)}>
          <option value="">All families</option>
          {families.map(f=> <option key={f._id} value={f._id}>{f.name}</option>)}
        </select>
      }>
        {loading? 'Loading...' : <Table headers={['Name','Family','Method','Case','Details','Actions']} rows={items.map(v=>[
          <b key="n">{v.firstName} {v.lastName}</b>,
          typeof v.family === 'string' ? v.family : (v.family?.name || '—'),
          typeof v.mannerOfDeath === 'string' ? v.mannerOfDeath : (v.mannerOfDeath?.name || '—'),
          typeof v.case === 'string' ? v.case : (v.case?.title || '—'),
          v.bodyDiscoveryDetails || '—',
          <div key="a" className="flex gap-2">
            <button onClick={()=>onDelete(v._id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
          </div>
        ])} />}
      </Card>

      <Card title="Create victim">
        <form onSubmit={onCreate} className="grid md:grid-cols-2 gap-2">
          <input className="border rounded p-2" placeholder="First name" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
          <input className="border rounded p-2" placeholder="Last name" value={lastName} onChange={e=>setLastName(e.target.value)} required />
          <select className="border rounded p-2" value={family} onChange={e=>setFamily(e.target.value)} required>
            <option value="">Family *</option>
            {families.map(f=> <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
          <select className="border rounded p-2" value={mannerOfDeath} onChange={e=>setMannerOfDeath(e.target.value)}>
            <option value="">Method</option>
            {methods.map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
          </select>
          <select className="border rounded p-2" value={caseId} onChange={e=>setCaseId(e.target.value)}>
            <option value="">Case</option>
            {cases.map(c=> <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <input className="border rounded p-2" placeholder="Occupation" value={occupation} onChange={e=>setOccupation(e.target.value)} />
          <input type="datetime-local" className="border rounded p-2" value={dateOfDeath} onChange={e=>setDateOfDeath(e.target.value)} />
          <textarea className="border rounded p-2 md:col-span-2" placeholder="Body discovery details" value={details} onChange={e=>setDetails(e.target.value)} />
          <button className="mt-2 bg-zinc-900 text-white rounded py-2 md:col-span-2">Create</button>
        </form>
      </Card>
    </div>
  )
}
