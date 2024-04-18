const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  res.json(db.testimonials);
});

router.get('/random', (req, res) => {
  const rand = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[rand]);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonial = db.testimonials.find(testimonial => testimonial.id === id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} not found` });
  }
});

router.post('/', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'Author and text are required' });
  }
  const newTestimonial = {
    id: db.testimonials.length + 1, 
    author,
    text
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  const index = db.testimonials.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {
    db.testimonials[index].author = author;
    db.testimonials[index].text = text;
    res.json({ message: `Testimonial with id ${id} has been updated` });
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} doesn't exist` });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.testimonials.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.json({ message: `Testimonial with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} not found` });
  }
});

module.exports = router;