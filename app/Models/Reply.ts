import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid} from 'uuid'
import Thread from './Thread'
import User from './User'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public content: string

  @column()
  public userId: string

  @column()
  public threadId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static generate_uuid_v4 (reply: Reply){
    reply.id = uuid()
  }

  @belongsTo(() => Thread)
  public thread: BelongsTo<typeof Thread>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
