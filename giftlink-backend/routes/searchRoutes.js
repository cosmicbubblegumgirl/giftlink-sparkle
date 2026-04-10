/* jshint esversion: 11, node: true */
const express = require('express');
const { connectToDatabase } = require('../models/db');
const { sampleGifts } = require('../util/seedData');

const router = express.Router();

function mockSearch(gifts, query) {
  const { q = '', category = '', location = '' } = query;
  return gifts.filter((gift) => {
    const joined = [gift.name, gift.description, gift.owner, gift.location].join(' ').toLowerCase();
    const queryOk = !q || joined.includes(q.toLowerCase());
    const categoryOk = !category || gift.category.toLowerCase().includes(category.toLowerCase());
    const locationOk = !location || gift.location.toLowerCase().includes(location.toLowerCase());
    return queryOk && categoryOk && locationOk;
  });
}

router.get('/', async function (req, res, next) {
  try {
    const db = await connectToDatabase();
    const { q = '', category = '', location = '' } = req.query;

    if (!db) {
      return res.status(200).json(mockSearch(sampleGifts, req.query));
    }

    const collection = db.collection('gifts');
    const andParts = [];

    if (q) {
      andParts.push({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { owner: { $regex: q, $options: 'i' } },
          { location: { $regex: q, $options: 'i' } }
        ]
      });
    }

    if (category) {
      andParts.push({ category: { $regex: category, $options: 'i' } });
    }

    if (location) {
      andParts.push({ location: { $regex: location, $options: 'i' } });
    }

    const results = await collection.find(andParts.length ? { $and: andParts } : {}).toArray();
    return res.status(200).json(results.map((gift) => ({ ...gift, id: gift.id || gift._id.toString() })));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
