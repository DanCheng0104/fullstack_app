const promise = require('bluebird');

//prod
// const options = {
//     // Initialization Options
//     promiseLib: promise
// };
// const pgp = require('pg-promise')(options);
// pgp.pg.defaults.poolSize = 20;
// const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
// const db = pgp(connectionString);
//local
const options = {
    // Initialization Options
    promiseLib: promise
  };
const pgp = require('pg-promise')(options);
const config = require('./config');
const db = pgp(config.connectionString);

// add query functions
function getAllNbs(req, res, next) {
    db.any('select name,st_asgeojson(geom) from nb_4326;')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL nbs'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
    getAllNbs: getAllNbs
//   getSinglePuppy: getSinglePuppy,
//   createPuppy: createPuppy,
//   updatePuppy: updatePuppy,
//   removePuppy: removePuppy
};