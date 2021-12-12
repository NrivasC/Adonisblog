import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coment from 'App/Models/Coment'

export default class ComentsController {

    public async index({params , request, response, auth}: HttpContextContract){

        if(!auth.isAuthenticated){
            response.redirect('/login')
        }
        const postId = params.postId
        
        const coment =new Coment()
        
        coment.coment = request.input('coment')
        coment.userId = auth.user!.id
        coment.postId = postId

        coment.save()

        return response.redirect().back() 


    }

    public async show({}:HttpContextContract){


    }

}
