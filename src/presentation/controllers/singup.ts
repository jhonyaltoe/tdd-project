import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) return badRequest(new InvalidParamError('email'))
  }
}
