import { contracts } from './data/contracts'
import ContractCard from './components/ContractCard'


export default function App() {
  return (
    <div>
      <h1>Dashboard de Contratos</h1>

      {contracts.map(contract => (
        <ContractCard
          key={contract.id}
          contract={contract}
        />
      ))}
    </div>
  )
}
