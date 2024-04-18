const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  res.json(db.seats);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const seat = db.seats.find(seat => seat.id === id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ message: `Seat with id ${id} not found` });
  }
});

router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;
  if (!seat || !client || !email || !day) {
    return res.status(400).json({ message: 'All details are required' });
  }
  const newSeat = {
    id: db.seats.length + 1, 
    seat,
    client,
    email,
    day
  };
  db.seats.push(newSeat);
  res.status(201).json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;

  const index = db.seats.findIndex(seat => seat.id === id);

  if (index !== -1) {
    db.seats[index].seat = seat;
    db.seats[index].client = client;
    db.seats[index].email = email;
    db.seats[index].day = day;
    res.json({ message: `Seat with id ${id} has been updated` });
  } else {
    res.status(404).json({ message: `Seat with id ${id} doesn't exist` });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.seats.findIndex(seat => seat.id === id);

  if (index !== -1) {
    db.seats.splice(index, 1);
    res.json({ message: `Seat with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Seat with id ${id} not found` });
  }
});

module.exports = router;