import { Router } from 'express'
// import { v4 } from 'uuid'

// import User from './app/models/User.js'

const routes = new Router()

routes.get('/', async (request, response) => {

  // const user = await User.create({
  //   id: v4(),
  //   name: 'Rodolfo',
  //   email: 'rodolfo@gmail.com',
  //   password_hash: '123456789',
  // })

  return response.json('Hello world')
})

export default routes
