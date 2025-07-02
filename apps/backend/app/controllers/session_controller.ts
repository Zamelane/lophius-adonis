import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registrationUserValidator } from '#validators/session'

export default class SessionController {
  /**
   * @registration
   * @summary Register a new user
   * @description Creates a new user account and returns authentication token
   * @tag Session
   * @requestFormDataBody <registrationUserValidator>
   * @responseBody 201 - { "token": "tBliNOWBsDBgJmuyFpsqTrtJg..." } - User successfully registered
   */
  async registration({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(registrationUserValidator)

    const user = await User.create(payload)
    const token = await auth.use('api').createToken(user)

    return response.created({ token })
  }

  /**
   * @store
   * @summary Login user
   * @description Auth user account and returns authentication token
   * @tag Session
   * @requestFormDataBody <loginUserValidator>
   * @responseBody 201 - { "token": "tBliNOWBsDBgJmuyFpsqTrtJg..." } - User successfully authenticated
   */
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    return response.created({ token })
  }

  /**
   * @destroy
   * @summary Logout user
   * @description Invalidate user token
   * @tag Session
   * @responseBody 200 - {} - User successfully logged out
   */
  async destroy({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
}
