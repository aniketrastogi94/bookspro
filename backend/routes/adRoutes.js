import express from 'express'
const router = express.Router()
import {
  getAds,
  getAdById,
  deleteAd,
  createAd,
  updateAd,
  getTopAds,
} from '../controllers/adController.js'
import { protect} from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getAds)
  .post(protect,createAd)
router
  .get('/top', getTopAds)
router
  .route('/:id')
  .get(getAdById)
  .delete(protect,deleteAd)
  .put(protect,updateAd)

export default router
