import express from 'express'
import { getWeightData, postWeightData } from '../controllers/track.js'
import { getHeightData, postHeightData } from '../controllers/track.js'
import { getBodyData, postBodyData } from '../controllers/track.js'
const router = express.Router()

router.route('/weight').
    get(getWeightData).
    post(postWeightData)

router.route('/height').
    get(getHeightData).
    post(postHeightData)

router.route('/body').
    get(getBodyData).
    post(postBodyData)

export default router