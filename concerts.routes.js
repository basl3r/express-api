const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  res.json(db.concerts);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const concert = db.concerts.find(concert => concert.id === id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ message: `Concert with id ${id} not found` });
  }
});

router.post('/', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ message: 'All details are required' });
  }
  const newConcert = {
    id: db.concerts.length + 1, 
    performer,
    genre,
    price,
    day,
    image
  };
  db.concerts.push(newConcert);
  res.status(201).json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { performer, genre, price, day, image } = req.body;

  const index = db.concerts.findIndex(concert => concert.id === id);

  if (index !== -1) {
    db.concerts[index].performer = performer;
    db.concerts[index].genre = genre;
    db.concerts[index].price = price;
    db.concerts[index].day = day;
    db.concerts[index].image = image;
    res.json({ message: `Concert with id ${id} has been updated` });
  } else {
    res.status(404).json({ message: `Concert with id ${id} doesn't exist` });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.concerts.findIndex(concert => concert.id === id);

  if (index !== -1) {
    db.concerts.splice(index, 1);
    res.json({ message: `Concert with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Concert with id ${id} not found` });
  }
});

module.exports = router;