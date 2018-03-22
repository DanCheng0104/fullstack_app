const promise = require('bluebird');

//prod
const options = {
    // Initialization Options
    promiseLib: promise
};
const pgp = require('pg-promise')(options);
pgp.pg.defaults.poolSize = 20;
const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
const db = pgp(connectionString);
//local
// const pgp = require('pg-promise')(options);
// const config = require('./config');
// const options = {
//   // Initialization Options
//   promiseLib: promise
// };
// const db = pgp(config.connectionString);






// add query functions
function getAllPuppies(req, res, next) {
    db.any('select name from nb_4326 limit 10;')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL puppies'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
   getAllPuppies: getAllPuppies
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};