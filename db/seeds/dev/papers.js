const movieData = require('./papersData');
const tables = ['action', 'all', 'comedy', 'fantasty', 'horror', 'romance', 'sci-fi']
const table = 'horror'

const createMovie = async (knex, movie) => {
  const movieId = await knex(table).insert({
    title: movie,
  }, 'id');
}
exports.seed = async (knex) => {
  try {
    await knex(table).del()
    let movieData2 = await movieData(table)
    console.log(movieData2)
    let moviePromises = movieData2.map(movie => {
      return createMovie(knex, movie);
    });
    return Promise.all(moviePromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
