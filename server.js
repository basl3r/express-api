const express = require('express');
const app = express();
const testimonialsRoutes = require('./testimonials.routes');
const concertsRoutes = require('./concerts.routes');
const seatsRoutes = require('./seats.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
