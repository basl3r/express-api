const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let nextId = 3;

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const rand = Math.floor(Math.random() * db.length);
  res.json(db[rand]);
});

app.get('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const testimonial = db.find(testimonial => testimonial.id === id);
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
  db.push(newTestimonial);
  res.status(201).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  const index = db.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {

    db[index].author = author;
    db[index].text = text;

    res.json({ message: `Testimonial with id ${id} has been updated` });
  } else {
    res.status(404).json({ message: `Testimonial with id ${id} doesn't exist` });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {

    db.splice(index, 1);

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
