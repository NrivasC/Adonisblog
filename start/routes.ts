
import Route from '@ioc:Adonis/Core/Route'

/* Route.on('/').render('home') */
Route.on('/welcome').render('prueba')
Route.on('/login').render('auth/login').middleware('guest')
Route.on('/signup').render('auth/signup')

/* POST */
Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/post/create', 'PostController.store').middleware('auth').prefix('/:id')
Route.post('/:postId', 'ComentsController.index').middleware('auth').prefix('/:id')
Route.post('/profile/edit','ProfilesController.update').middleware('auth').prefix('/:id')


/* GET */
Route.get('/', 'HomeController.index').middleware('auth')
Route.get('/post/create', 'PostController.index').middleware('auth').prefix('/:id')
Route.get('/logout', 'AuthController.logout')
Route.get('/profile/edit', 'ProfilesController.edit').middleware('auth').prefix('/:id')
Route.get(':postId/like/:value', 'LikesController.index').prefix('/:id')


