const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.send(db);
  console.log(db.length);
});

app.get('/testimonials/random', (req, res) => {
  const rand = Math.floor(Math.random() * db.length + 1)
  res.send(db[rand - 1]);
});

app.get('/testimonials/:id', (req, res) => {
  const numb = req.params.id;
  res.send(db[numb - 1]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const newTestimonial = {
    id: db.length + 1,
    author,
    text
  };

  db.push(newTestimonial);
  res.status(201).send({ message: 'Testimonial added successfully', newTestimonial });
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  const index = db.findIndex(testimonal => testimonal.id === id);

  if (index !== -1) {
    db[index].author = author;
    db[index].text = text;

    res.status(200).send({ message: `Testimonal with id ${id} has been updated`});
  } else {
    res.status(404).send({ message: `Testimonal with ${id} doesn't exists`});
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = db.findIndex(testimonial => testimonial.id === id);

  if (index !== -1) {
    db.splice(index, 1);

    res.status(200).send({ message: `Testimonial with id ${id} deleted successfully` });
  } else {
    res.status(404).send({ message: `Testimonial with id ${id} not found` });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
