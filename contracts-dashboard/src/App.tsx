import { useState } from 'react'
import { contracts } from './data/contracts'
import ContractCard from './components/ContractCard'


export default function App() {

  type StatusFilter = '' | 'ativo' | 'cancelado'


  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('')

  const [search, setSearch] = useState('')

  // Filtro de status
  const filteredContracts = contracts.filter(contract => {
    const matchesStatus =
      statusFilter === '' ||
      contract.status === statusFilter

    const matchesSearch =
      contract.cliente
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesStatus && matchesSearch
  })

  return (
    <div>
      <h1>Dashboard de Contratos</h1>

      <div className="row">

        <label htmlFor="">Status</label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">Todos</option>
          <option value="ativo">Ativos</option>
          <option value="cancelado">Cancelados</option>
        </select>

        <label htmlFor="">Cliente</label>
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />



      </div>

      {filteredContracts.map(contract => (
        <ContractCard
          key={contract.id}
          contract={contract}
        />
      ))}
    </div>
  )
}
