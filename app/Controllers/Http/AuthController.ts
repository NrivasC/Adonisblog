import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/user'

export default class AuthController {

    public async signup({request, response}) {

        const req = schema.create({
            name: schema.string({}),
            email: schema.string({trim: true},[
                rules.email(),
                ]),
            password: schema.string({},[
                rules.minLength(8)]),
            repeat_password: schema.string({},[
                rules.minLength(8)]),              
        })
        const valData = await request.validate({
            schema: req,
            messages:{
                required: 'The {{field}} is requiered to Login',
                '*.minLength': '{{field}} must be at leats 8 character',
              }
            })
        const avatar = 'images/predeterminate_avatar.jpg'    

        const user = new User();

        user.name = valData.name
        user.email = valData.email
        user.avatar = avatar
        user.password = valData.password
        await user.save();

        return response.redirect('/login')  

    }

    public async login( {request, auth, response}:HttpContextContract) {
        
        const req = schema.create({
            email: schema.string({trim: true},[
                rules.email()]),
            password: schema.string({},[
                rules.minLength(8)]),                
        })
        const valData = await request.validate({
            schema: req,
            messages:{
                required: 'The {{field}} is requiered to Login',
                'password.minLength': 'Password must be at leats 8 character',
              }
            })

        await auth.attempt(valData.email, valData.password)
        
        console.log(auth.user)
        return response.redirect('/')
    
    }
    
    public async logout({ auth, response }: HttpContextContract) {

        await auth.logout()
        return response.redirect('/login')
    }
    
}

/* insert into users (id, name, email, password,  created_at,  updated_at) values('1', 'Nelson Rivas', 'Nelson@gmail.com', '123456789', '0000-00-00 00:00:00', '0000-00-00 00:00:00') */