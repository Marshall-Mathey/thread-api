import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from '../../Validators/RegisterValidator'
import User from '../../Models/User'

export default class AuthController {
  public async register ({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    const user = User.create(payload)
    const token = await auth.login(user)
    return response.created(token)
  }

  public async login ({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return response.badRequest({message:'Invalid credentials'})
    }
  }
}
