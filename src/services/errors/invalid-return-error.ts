export class InvalidReturnError extends Error {
  constructor() {
    super('Invalid return to loan.')
  }
}
