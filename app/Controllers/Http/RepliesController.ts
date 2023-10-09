import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostReplyValidator from '../../Validators/PostReplyValidator'
import Thread from '../../Models/Thread'

export default class RepliesController {
  public async store ({ request, response, params, auth }: HttpContextContract) {
    const { content } = await request.validate(PostReplyValidator)

    const thread = await Thread.findOrFail(params.thread_id)

    const reply = await thread.related('replies').create({
      userId: auth.user!.id,
      content,
    })

    await reply.load('user')
    await reply.load('thread')

    return response.created(reply)
  }
}
