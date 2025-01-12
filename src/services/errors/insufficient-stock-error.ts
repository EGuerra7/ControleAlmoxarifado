export class InsufficientStockError extends Error {
  constructor() {
    super('Insuffficient stock to loan.')
  }
}
