import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve, dirname } from 'path'

const __dirname = resolve(dirname(''))
// console.log(__dirname + '/uploads')

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, 'uploads'),
    filename: (request, file, callback) => {
      return callback(null, v4() + extname(file.originalname))
    },
  }),
}
