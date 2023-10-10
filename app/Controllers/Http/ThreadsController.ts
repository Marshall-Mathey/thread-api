import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateThreadValidator from '../../Validators/CreateThreadValidator'
import Thread from '../../Models/Thread'
import UpdateThreadValidator from '../../Validators/UpdateThreadValidator'
import SortValidator from '../../Validators/SortValidator'

export default class ThreadsController {
  public async index ({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const userId = request.input('user_id')
    const categoryId = request.input('category_id')

    const payload = await request.validate(SortValidator)

    const sortBy = payload.sort_by || 'id'
    const sortOrder = payload.sort_order || 'asc'

    const threads = await Thread.query()
      .if(userId, (query) => query.where('user_id', userId)).preload('user')
      .if(categoryId, (query) => query.where('category_id', categoryId))
      .orderBy(sortBy, sortOrder)
      .preload('category')
      .preload('replies')
      .paginate(page, perPage)

    return response.ok(threads)
  }

  public async store ({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateThreadValidator)

    const thread = await auth.user?.related('threads').create(payload)

    await thread?.load('user')
    await thread?.load('category')
    await thread?.load('replies')

    return response.created(thread)
  }

  public async show ({ params, response }: HttpContextContract) {
    const thread = await Thread.query().where('id', params.id)
      .preload('user')
      .preload('category')
      .preload('replies')
      .firstOrFail()

    return response.ok(thread)
  }

  public async update ({ params, request, response, auth }: HttpContextContract) {
    const thread = await Thread.findOrFail(params.id)

    const payload = await request.validate(UpdateThreadValidator)

    if(auth.user?.id !== thread.userId){
      return response.unauthorized({message: 'You are not authorized to update this thread.'})
    }

    thread.merge(payload)
    await thread.save()

    await thread.load('user')
    await thread.load('category')
    await thread.load('replies')

    return response.ok(thread)
  }

  public async destroy ({ params, auth, response }: HttpContextContract) {
    const thread = await Thread.findOrFail(params.id)

    if(auth.user?.id !== thread.userId){
      return response.unauthorized({message: 'You are not authorized to delete this thread.'})
    }

    await thread.delete()
  }
}
