import { type Controller } from '@presentation/protocols'
import { DbAddAccount } from '@data/useCases/addAccount/db-addaccount'
import { BcryptAdapter } from '@infra/cryptografy/bcrypt-adapter/bcrypt-adapter'
import { LogMongoRepository } from '@infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '@infra/db/mongodb/account/account-mongo-repository'
import { SignUpController } from '@presentation/controllers/signUp/signup-controller'
import { LogContollerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const logMongoRepository = new LogMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  return new LogContollerDecorator(signUpController, logMongoRepository)
}
