import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FamiliesPage from './pages/Families'
import MethodsPage from './pages/Methods'
import VictimsPage from './pages/Victims'
import CasesPage from './pages/Cases'

export default function App(){
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="families" element={<FamiliesPage />} />
        <Route path="methods" element={<MethodsPage />} />
        <Route path="victims" element={<VictimsPage />} />
        <Route path="cases" element={<CasesPage />} />
      </Route>
    </Routes>
  )
}
