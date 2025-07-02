import vine from '@vinejs/vine'

/**
 * Валидация обновления пользователя
 */
export const updateUserValidator = vine.compile(
  vine.object({
    nickname: vine.string().trim().minLength(2).maxLength(17).optional(),
    avatar: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '5mb' }).nullable().optional(),
  })
)