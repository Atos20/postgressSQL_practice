const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const singleMovie = require('../apiCalls/movieCalls')
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'tasteExpress';

app.get('/api/v1/movies/:genre', async (req, res) => {
  let randomIndex = Math.floor(Math.random() * 100)
  try {
    const randomMovie = await database(req.params.genre).where("id", randomIndex).select();
    let randomMovieTitle = randomMovie[0].title.split('/')[2]
    const randomMovieDetails = await singleMovie(randomMovieTitle)
    res.status(200).json(randomMovieDetails);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
