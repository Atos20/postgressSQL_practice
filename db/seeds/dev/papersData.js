// papersData.js
const movieFetch = require('../../../apiCalls/movieCalls')

const movieData = async (table) => {
  const dataToPopulate = await movieFetch(table)
  return dataToPopulate
}

module.exports = movieData;

