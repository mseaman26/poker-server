
import express from 'express'
const apiRoutes = express.Router()


import userRoutes from './userRoutes.js'

apiRoutes.use('/users', userRoutes)

export default apiRoutes