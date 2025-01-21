export class InvalidLoanError extends Error {
    constructor() {
        super('Loan invalid, without products.')
    }
}