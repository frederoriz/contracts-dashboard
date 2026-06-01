export type Contract = {
    id: number
    cliente: string
    valor: number
    status: 'ativo' | 'cancelado'
}