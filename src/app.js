import express, { json } from 'express'
import routes from './routes.js'
import './database/index.js'
import { resolve, dirname } from 'path'

const __dirname = resolve(dirname(''))
class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(json())
    this.app.use('/product-file', express.static(resolve(__dirname, 'uploads')))
    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, 'uploads'))
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
