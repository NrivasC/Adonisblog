import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'

export default class LikesController {

    public async index({params, response, auth}:HttpContextContract){

        if(!auth.isAuthenticated){
            response.redirect('/login')
        }

        const postId = params.postId
        const value = params.value
        const like =new Like()
        
        like.like = value
        like.userId = auth.user!.id
        like.postId = postId

        like.save()

        return response.redirect().back() 
        
        
    }


}
