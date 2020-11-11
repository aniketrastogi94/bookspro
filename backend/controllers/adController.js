import asyncHandler from 'express-async-handler'
import Ad from '../models/AdModel.js'

// @desc    Fetch all Ads
// @route   GET /api/ads
// @access  Public
const getAds = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Ad.countDocuments({ ...keyword })
  const ads = await Ad.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ ads, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single ad
// @route   GET /api/ads/:id
// @access  Public
const getAdById = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id)

  if (ad) {
    res.json(ad)
  } else {
    res.status(404)
    throw new Error('Ad not found')
  }
})

// @desc    Delete a ad
// @route   DELETE /api/ads/:id
// @access  Private
const deleteAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id)

  if (ad) {
    await ad.remove()
    res.json({ message: 'Ad removed' })
  } else {
    res.status(404)
    throw new Error('Ad not found')
  }
})

// @desc    Create a Ad
// @route   POST /api/Ads
// @access  Private
const createAd = asyncHandler(async (req, res) => {
  const ad = new Ad({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    status:'available',
    description: 'Sample description',
    number:0
  })

  const createdAd = await ad.save()
  res.status(201).json(createdAd)
})

// @desc    Update a ad
// @route   PUT /api/ads/:id
// @access  Private
const updateAd = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    status,
    number
  } = req.body

  const ad = await Ad.findById(req.params.id)

  if (ad) {
    ad.name = name
    ad.price = price
    ad.description = description
    ad.image = image
    ad.brand = brand
    ad.category = category
    ad.status = status
    ad.number=  number

    const updatedAd = await ad.save()
    res.json(updatedAd)
  } else {
    res.status(404)
    throw new Error('Ad not found')
  }
})



// @desc    Get top ads
// @route   GET /api/adss/top
// @access  Public
const getTopAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({}).limit(3)

  res.json(ads)
})

export {
  getAds,
  getAdById,
  deleteAd,
  createAd,
  updateAd,
  getTopAds,
}
