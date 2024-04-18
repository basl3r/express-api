const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let nextId = 3;

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const rand = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[rand]);
});

app.get('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonial = db.testimonials.find(testimonial => testimonial.id === id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} not found` });
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'Author and text are required' });
  }
  const newTestimonial = {
    id: nextId++, 
    author,
    text
  };
  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.testimonials.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.json({ message: `Testimonial with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} not found` });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
