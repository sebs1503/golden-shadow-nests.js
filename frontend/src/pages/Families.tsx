import { FormEvent, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Family } from '../lib/types'
import { Card } from '../components/Card'
import { Table } from '../components/Table'

export default function FamiliesPage(){
  const [items, setItems] = useState<Family[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')

  const load = async ()=>{
    setLoading(true)
    try { setItems(await api.families.list({limit: 100})) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const onCreate = async (e: FormEvent)=>{
    e.preventDefault()
    await api.families.create({name, description, city})
    setName(''); setDescription(''); setCity('')
    await load()
  }
  const onDelete = async (id: string)=>{
    if (!confirm('Delete family?')) return
    await api.families.remove(id)
    await load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Families">
        {loading? 'Loading...' : <Table headers={['Name','City','Description','Actions']} rows={items.map(f=>[
          <b key="n">{f.name}</b>,
          f.city || '—',
          f.description || '—',
          <div key="a" className="flex gap-2">
            <button onClick={()=>onDelete(f._id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
          </div>
        ])} />}
      </Card>
      <Card title="Create family">
        <form onSubmit={onCreate} className="grid gap-2">
          <input className="border rounded p-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="border rounded p-2" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
          <textarea className="border rounded p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="mt-2 bg-zinc-900 text-white rounded py-2">Create</button>
        </form>
      </Card>
    </div>
  )
}
