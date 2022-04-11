export class PreconditionFailure extends Error {
  override name = 'PreconditionFailure'
}

export function preconditionFailure (message: string) {
  throw new PreconditionFailure(message)
}