import * as Yup from 'yup'
import User from '../models/User.js'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordInconrrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct.' })
    }

    if (!(await schema.isValid(request.body))) userEmailOrPasswordInconrrect()

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) userEmailOrPasswordInconrrect()

    if (!(await user.checkPassword(password))) userEmailOrPasswordInconrrect()

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
    })
  }
}

export default new SessionController()
