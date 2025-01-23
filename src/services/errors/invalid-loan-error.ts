export class InvalidLoanError extends Error {
    constructor() {
        super('Empréstimo inválido, sem produtos!')
    }
}