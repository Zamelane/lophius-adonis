import vine from '@vinejs/vine'

/**
 * Валидация действия создания пользователя
 */
export const registrationUserValidator = vine.compile(
  vine.object({
    nickname: vine.string().trim().minLength(2).maxLength(17),
    email: vine
      .string()
      .email()
      .maxLength(254)
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(5).maxLength(55),
  })
)

/**
 * Валидация действия входа пользователя
 */
export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(254).trim(),
    password: vine.string().trim().minLength(5).maxLength(55),
  })
)
