import { useState } from 'react'
import { contracts } from './data/contracts'
import ContractCard from './components/ContractCard'


export default function App() {

  type StatusFilter = '' | 'ativo' | 'cancelado'
  type Order = 'id_desc' | 'id_asc' | 'asc_valor' | 'desc_valor' | 'asc_alfabeto' | 'desc_alfabeto'

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('')

  const [search, setSearch] = useState('')

  const [order, setOrder] = useState<Order>('id_desc')

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
  }).sort((a, b) => {
    switch (order) {

      case 'asc_valor':
        return a.valor - b.valor

      case 'desc_valor':
        return b.valor - a.valor

      case 'asc_alfabeto':
        return a.cliente.localeCompare(b.cliente)

      case 'desc_alfabeto':
        return b.cliente.localeCompare(a.cliente)

      case 'id_asc':
        return a.id - b.id

      case 'id_desc':
        return b.id - a.id

    }
  })

  return (
    <div>
      <h1>Dashboard de Contratos</h1>

      <div className="row">

        <label htmlFor="">Ordem</label>
        <select
          value={order}
          onChange={(event) => setOrder(event.target.value as Order)}
        >
          <option value="id_desc">Id (Recentes)</option>
          <option value="id_asc">Id (Antigos)</option>
          <option value="asc_alfabeto">Nome A-Z</option>
          <option value="desc_alfabeto">Nome Z-A</option>
          <option value="asc_valor">Menor valor</option>
          <option value="desc_valor">Maior valor</option>
        </select>

        <label htmlFor="">Status</label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
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
