 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema } from '@ioc:Adonis/Core/Validator'
 import Application from '@ioc:Adonis/Core/Application'
import Post from 'App/Models/Post'


export default class PostController {

    public async index({view}:HttpContextContract){
        return view.render('posts/create')
    } 

    public async store({ request, auth, response }: HttpContextContract) {


        const req = await request.validate({
            schema: schema.create({
            image: schema.file({
              extnames: ['jpg', 'gif', 'png', 'svg'],
            }),
            text: schema.string({})
          }),
    
          messages: {
            required: '{{field}} is requiered to posts',
            'file.extname': 'The file must have one of {{ options.extnames }} extension names',
          }
        })
    
        const imageName = new Date().getTime().toString() + `.${req.image.extname}`
        await req.image.move(Application.publicPath('images'), {
          name: imageName
        })
        const post = new Post()
        post.image = `images/${imageName}`
        post.text = req.text
        post.userId = auth.user!.id
    
        post.save()
    
        return response.redirect(`/`)
      }

    public async create({}:HttpContextContract){


        
    }

}
