
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        { name: 'Nicole', content:'cook dinner',},
        { name: 'Blake', content:'wash hoodie',},
        { name: 'me', content:'relax'},
        { name: 'NicoleII', content:'take  Harper '},
      ]);
    });
};
