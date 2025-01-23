export class InsufficientStockError extends Error {
  constructor() {
    super('Estoque insuficiente para empréstimo.')
  }
}
