import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateThreadValidator from '../../Validators/CreateThreadValidator'
import Thread from '../../Models/Thread'
import UpdateThreadValidator from '../../Validators/UpdateThreadValidator'

export default class ThreadsController {
  public async index ({ response }: HttpContextContract) {
    const threads = await Thread.query().preload('user').preload('category')

    return response.ok(threads)
  }

  public async store ({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateThreadValidator)

    const thread = await auth.user?.related('threads').create(payload)

    await thread?.load('user')
    await thread?.load('category')

    return response.created(thread)
  }

  public async show ({ params, response }: HttpContextContract) {
    const thread = await Thread.query().where('id', params.id).preload('user').preload('category').firstOrFail()

    return response.ok(thread)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const thread = await Thread.findOrFail(params.id)

    const payload = await request.validate(UpdateThreadValidator)

    thread.merge(payload)
    await thread.save()

    await thread.load('user')
    await thread.load('category')

    return response.ok(thread)
  }

  public async destroy ({params}: HttpContextContract){
    const thread = await Thread.findOrFail(params.id)

    await thread.delete()
  }
}
