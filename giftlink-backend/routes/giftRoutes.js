/* jshint esversion: 11, node: true */
const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');
const { sampleGifts } = require('../util/seedData');

const router = express.Router();

async function getCollection() {
  const db = await connectToDatabase();
  return db ? db.collection('gifts') : null;
}

function withId(gift) {
  return {
    ...gift,
    id: gift.id || (gift._id ? gift._id.toString() : undefined)
  };
}

router.get('/', async function (req, res, next) {
  try {
    const collection = await getCollection();

    if (!collection) {
      return res.status(200).json(sampleGifts);
    }

    const gifts = await collection.find({}).toArray();
    return res.status(200).json(gifts.map(withId));
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const collection = await getCollection();

    if (!collection) {
      const foundGift = sampleGifts.find((gift) => gift.id === req.params.id);
      if (!foundGift) {
        return res.status(404).json({ error: 'Gift not found' });
      }
      return res.status(200).json(foundGift);
    }

    let query = { id: req.params.id };

    if (ObjectId.isValid(req.params.id)) {
      query = { _id: new ObjectId(req.params.id) };
    }

    const gift = await collection.findOne(query);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    return res.status(200).json(withId(gift));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
