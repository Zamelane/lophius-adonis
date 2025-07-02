import { updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'

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

  /**
   * @updateMe
   * @summary Update current user
   * @requestFormDataBody {"nickname": {"type":"string"}, "avatar": {"type":"string", "format": "binary"}}
   * @responseBody 201 - <User>
   */
  public async updateMe({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { avatar, ...payload } = await request.validateUsing(updateUserValidator)

    user.merge(payload)

    if (avatar !== undefined) {
      user.avatar = avatar ? await attachmentManager.createFromFile(avatar) : avatar
    }

    await user.save()

    return response.created(user)
  }
}