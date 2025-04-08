export class EmailRejectError extends Error {
  constructor(message = 'Email was rejected.') {
    super(message);
    this.name = 'EmailRejectError';
  }
}
