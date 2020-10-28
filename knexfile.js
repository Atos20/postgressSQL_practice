// // Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/example1',// this is the  a connection string
    migrations: {
      directory: './db/migrations'//tell knex where we’re going to store our migrations:
    },

    seeds: {
      directory: './seeds/01_todo'
    },
    
    useNullAsDefault: true
    /*
    useNullAsDefault
This is just an option that will take any undefined keys 
or values in our database and set them equal to null rather 
than having to specify a default value for each one. So if 
you have an array of research papers in one of your 
postgres tables, and each paper has an optional subtitle 
field, we don’t want to set a default subtitle on every paper 
- we just want it to be blank by using null.
    */
  }
};

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };
