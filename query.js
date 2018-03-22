const promise = require('bluebird');
//const config = require('./config');
const options = {
  // Initialization Options
  promiseLib: promise
};
//console.log(config.connectionString);


const pgp = require('pg-promise')(options);
pgp.pg.defaults.poolSize = 20;
//var db = pgp(config.connectionString);
const connectionString = `${process.env.DATABASE_URL}?ssl=true`;
const db = pgp(connectionString);

// add query functions
function getAllPuppies(req, res, next) {
    db.any('select ST_AsGeoJSON(geom) from nb_4326 limit 10;')
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