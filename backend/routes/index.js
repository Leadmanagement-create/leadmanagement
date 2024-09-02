import express from 'express'
import userRoute from './userRoute.js'
import tokenRoute from './tokenRoute.js'
import leadRoute from './leadRoute.js'
import uploadRoute from './uploadRoute.js'
import templateRoutes from './templateRoute.js'
import campaignEventRoute from './campaignEventRoute.js'
// import campaignSettingRoute from './campaignSettingRoute.js'


const router = express.Router()
const defaultRoutes = [
  {
    path: '/api/users',
    route: userRoute,
  },
  {
    path: '/api/token',
    route: tokenRoute,
  },
  {
    path: '/api/lead',
    route: leadRoute,
  },
  {
    path: '/api/upload',
    route: uploadRoute
  }
]
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
