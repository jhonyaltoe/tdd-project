import { type EmailValidator, type Validation } from '../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { makeSingUpValidation } from './singup-validation-factory'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SingUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSingUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})