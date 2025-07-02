import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async store() {
    return { hello: 'world' }
  }
  /**
   * @me
   * @summary Current user
   * @responseBody 200 - <User>
   */
  public async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    return response.ok(user)
  }
}
