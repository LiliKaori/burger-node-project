import * as Yup from 'yup'
import Product from '../models/Product.js'

class ProductController {
  async store(request, response) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().required(),
      category: Yup.string().required(),
    })

    try {
      await Schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { filename: path } = request.file
    const { name, price, category } = request.body

    const product = await Product.create({
      name,
      price,
      category,
      path,
    })
    return response.json(product)
  }

  async index(request, response) {
    const products = await Product.findAll()

    console.log(request.userId)
    return response.json(products)
  }
}

export default new ProductController()
