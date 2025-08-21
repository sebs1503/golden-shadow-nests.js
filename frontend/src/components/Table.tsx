import { ReactNode } from 'react'

export function Table({ headers, rows }: { headers: ReactNode[], rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-zinc-50">
          <tr>
            {headers.map((h, i) => <th key={i} className="text-left p-2 border-b">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-zinc-50/50">
              {r.map((c, j) => <td key={j} className="p-2 border-b align-top">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
