/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from './kernel.js'

const SessionController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Api группа
router
  .group(() => {
    // [Вход и регистрация]
    router.put('session', [SessionController, 'registration'])
    router.post('session', [SessionController, 'store'])
    router
      .delete('session', [SessionController, 'destroy'])
      .use(middleware.auth({ guards: ['api'] }))

    // [Пользователи]
    router
      .group(() => {
        router.get('/me', [UsersController, 'me']).use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/users')
  })
  .prefix('/api')

/*
 * Swagger
 * [returns swagger in YAML]
 */
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
