import * as Yup from 'yup'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/User.js'

class ProductController {
  async store(request, response) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().required(),
      category_id: Yup.number().required(),
    })

    try {
      await Schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { filename: path } = request.file
    const { name, price, category_id } = request.body

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
    })
    return response.json(product)
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })

    return response.json(products)
  }
}

export default new ProductController()
