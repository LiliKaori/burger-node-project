import { Router } from 'express'
// import { v4 } from 'uuid'

// import User from './app/models/User'

const routes = new Router()

routes.get('/', (request, response) => {
  return response.json({ mesage: 'Hello World' })
})

export default routes
