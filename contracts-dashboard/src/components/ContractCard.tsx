import type { Contract } from '../types/contract'

type ContractCardProps = {
  contract: Contract
}

export default function ContractCard({
  contract
}: ContractCardProps) {
  return (
    <div>
      <h2>{contract.cliente}</h2>

      <p>Valor: R$ {contract.valor}</p>

      <p>Status: {contract.status}</p>
    </div>
  )
}