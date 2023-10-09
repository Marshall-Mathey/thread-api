import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from '../../Validators/RegisterValidator'
import User from '../../Models/User'

export default class AuthController {
  public async register ({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = User.create(payload)
    const token: string = await auth.login(user)
    return token
  }
}
