import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Coment from './Coment'
import Like from './Like'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public avatar: string

  @column()
  public description:string

  @column()
  public password: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Coment)
  public coment: HasMany<typeof Coment>

  @hasMany(() => Like)
  public like: HasMany<typeof Like>
  
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
