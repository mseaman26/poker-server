import app from 'express'
const apiRoutes = app.Router()

import userRoutes from './userRoutes.js'

apiRoutes.use('/users', userRoutes)

export default apiRoutes