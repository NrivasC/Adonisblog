import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {

    public async edit({view}:HttpContextContract){
        return view.render('profile/edit')
    }

    public async update({auth, request, response}:HttpContextContract){

        const user = auth.user
        const avatar = request.file('avatar')

        if (avatar) {
            const imageName = new Date().getTime().toString() + `.${avatar.extname}`
            await avatar.move(Application.publicPath('images'), {
            name: imageName
            })
            user!.avatar = `images/${imageName}`
          }

          user!.description = request.input('description')

          await user!.save()
          return response.redirect(`/`)



    }

}
