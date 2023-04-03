import * as Yup from 'yup'
import Category from '../models/Category.js'

class CategoryController {
  async store(request, response) {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await Schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exist' })
    }

    const { id } = await Category.create({ name })

    return response.json({ name, id })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    console.log(request.userId)
    return response.json(categories)
  }
}

export default new CategoryController()
