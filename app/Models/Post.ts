import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import User from './user'
import Coment from './Coment'
import Like from './Like'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public image: string

  @column()
  public text: string

  @column()
  public userId: number

  @hasMany(() => Coment)
  public coment: HasMany<typeof Coment>

  @hasMany(() => Like)
  public like: HasMany<typeof Like>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
}
