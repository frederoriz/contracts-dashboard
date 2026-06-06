import { useState } from 'react'
import { contracts } from './data/contracts'
import ContractCard from './components/ContractCard'


export default function App() {

  type StatusFilter = '' | 'ativo' | 'cancelado';
  type Order = number;
  type statusOptions = string;

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<Order>(1);
  const orderOptions = [
    { id: 1, name: 'Id (Recentes)' },
    { id: 2, name: 'Id (Antigos)' },
    { id: 3, name: 'Nome A-Z' },
    { id: 4, name: 'Nome Z-A' },
    { id: 5, name: 'Menor valor' },
    { id: 6, name: 'Maior valor' },
  ];

  const statusOptions = [
    { id: 'ativo', name: 'Ativos' },
    { id: 'cancelado', name: 'Cancelados' },
  ]

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

      case 1:
        return b.id - a.id

      case 2:
        return a.id - b.id

      case 3:
        return a.cliente.localeCompare(b.cliente)

      case 4:
        return b.cliente.localeCompare(a.cliente)

      case 5:
        return a.valor - b.valor

      case 6:
        return b.valor - a.valor

      default:
        return 1;
    }
  })

  const totalContractsValue = filteredContracts.reduce(
    (total, contract) => total + contract.valor,
    0
  )

  return (
    <div>
      <h1>Dashboard de Contratos</h1>

      <div className="row">
        <span className='badge badge-primary'>{filteredContracts.length} Contratos</span>
        <br />
        <span className='badge badge-primary'>Valor total: R${totalContractsValue}</span>
      </div>

      <div className="row">

        <label htmlFor="">Ordem</label>
        <select
          value={order}
          onChange={(event) => setOrder(Number(event.target.value))}>

          {orderOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}

        </select>

        <label htmlFor="">Status</label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>

          <option value="">Todos</option>
          {statusOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
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
