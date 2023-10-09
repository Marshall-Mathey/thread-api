import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ThreadValidator from '../../Validators/ThreadValidator'
import Thread from '../../Models/Thread'

export default class ThreadsController {
  public async index ({ response }: HttpContextContract) {
    const threads = await Thread.query().preload('user').preload('category')

    return response.ok(threads)
  }

  public async store ({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ThreadValidator)

    const thread = await auth.user?.related('threads').create(payload)

    await thread?.load('user')
    await thread?.load('category')

    return response.created(thread)
  }

  public async show ({ params, response }: HttpContextContract) {
    const thread = await Thread.query().where('id', params.id).preload('user').preload('category').firstOrFail()

    return response.ok(thread)
  }
}
