import { FormEvent, useEffect, useState } from 'react'
import { api } from '../lib/api'
import { MurderMethod } from '../lib/types'
import { Card } from '../components/Card'
import { Table } from '../components/Table'

export default function MethodsPage(){
  const [items, setItems] = useState<MurderMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [symbolism, setSymbolism] = useState('')

  const load = async ()=>{
    setLoading(true)
    try { setItems(await api.methods.list({limit: 100})) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const onCreate = async (e: FormEvent)=>{
    e.preventDefault()
    await api.methods.create({name, description, symbolism})
    setName(''); setDescription(''); setSymbolism('')
    await load()
  }
  const onDelete = async (id: string)=>{
    if (!confirm('Delete method?')) return
    await api.methods.remove(id)
    await load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card title="Murder Methods">
        {loading? 'Loading...' : <Table headers={['Name','Symbolism','Description','Actions']} rows={items.map(m=>[
          <b key="n">{m.name}</b>,
          m.symbolism || '—',
          m.description || '—',
          <div key="a" className="flex gap-2">
            <button onClick={()=>onDelete(m._id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
          </div>
        ])} />}
      </Card>
      <Card title="Create method">
        <form onSubmit={onCreate} className="grid gap-2">
          <input className="border rounded p-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="border rounded p-2" placeholder="Symbolism" value={symbolism} onChange={e=>setSymbolism(e.target.value)} />
          <textarea className="border rounded p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="mt-2 bg-zinc-900 text-white rounded py-2">Create</button>
        </form>
      </Card>
    </div>
  )
}
