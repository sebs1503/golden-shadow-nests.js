import { ReactNode } from 'react'

export function Card({children, title, actions}: {children: ReactNode, title: string, actions?: ReactNode}){
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="ml-auto flex gap-2">{actions}</div>
      </div>
      {children}
    </div>
  )
}
