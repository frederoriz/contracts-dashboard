import { useState } from 'react'
import { contracts } from './data/contracts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="div">
      <h1>Dashboard Contratos</h1>

      {contracts.map(contract => (
        <div key={contract.id}>
          <h2>{contract.cliente}</h2>

          <p>Valor: R$ {contract.valor}</p>

          <p>Status: {contract.status}</p>
        </div>
      ))}
    </div>
  )
}

export default App
