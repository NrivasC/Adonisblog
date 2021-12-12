import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coment from 'App/Models/Coment'
import Post from 'App/Models/Post'
import Like from 'App/Models/Like'


export default class HomeController {

    public async index({ view, auth, response }: HttpContextContract) {

        if (!auth.isAuthenticated) {
            return response.redirect('/login')
        }

        const posts = await Post.query()
                                .preload('user')
                                .preload('like')
                                .orderBy('created_at ', 'desc')
        

        const coments = await Coment.query()
                                     .preload('user')
                                     .preload('post')
                                     .orderBy('created_at ', 'desc') 
        
        const likes = await Like.query()
                                .preload('user')
                                .preload('post')
                                    
        
        
        console.log(coments)

        return view.render('home', { posts, coments, likes})
    }


}
