
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
            username:"john",
            email:"john@yopmail.com",
            first_name: "John",
            last_name:"Doe",
            password:"11111"
        },
      ]);
    });
};
